package com.school.attendance.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;

@Configuration
@Slf4j
public class DatabaseConfig {

    @Value("${spring.datasource.url:}")
    private String defaultUrl;

    @Value("${spring.datasource.username:postgres}")
    private String defaultUser;

    @Value("${spring.datasource.password:postgres}")
    private String defaultPassword;

    @Bean
    @Primary
    public DataSource dataSource() {
        // Check multiple common cloud environment variable names
        String dbUrlEnv = System.getenv("DATABASE_URL");
        if (dbUrlEnv == null || dbUrlEnv.isBlank()) {
            dbUrlEnv = System.getenv("DB_URL");
        }
        if (dbUrlEnv == null || dbUrlEnv.isBlank()) {
            dbUrlEnv = System.getenv("SPRING_DATASOURCE_URL");
        }
        if (dbUrlEnv == null || dbUrlEnv.isBlank()) {
            dbUrlEnv = System.getenv("POSTGRES_URL");
        }

        HikariConfig config = new HikariConfig();

        // 1. Cloud PostgreSQL (Supabase / Render format: postgresql://user:pass@host:port/dbname)
        if (dbUrlEnv != null && !dbUrlEnv.isBlank()) {
            dbUrlEnv = dbUrlEnv.trim();
            log.info("=================================================");
            log.info("Detected Cloud Database Environment Variable!");
            log.info("=================================================");

            if (dbUrlEnv.startsWith("postgres://") || dbUrlEnv.startsWith("postgresql://")) {
                try {
                    URI dbUri = new URI(dbUrlEnv);
                    String userInfo = dbUri.getUserInfo();
                    String username = defaultUser;
                    String password = defaultPassword;

                    if (userInfo != null && userInfo.contains(":")) {
                        String[] parts = userInfo.split(":", 2);
                        username = parts[0];
                        password = parts[1];
                    }

                    int port = dbUri.getPort() == -1 ? 5432 : dbUri.getPort();
                    String host = dbUri.getHost();
                    String path = dbUri.getPath();
                    if (path == null || path.isBlank() || path.equals("/")) {
                        path = "/postgres";
                    }

                    String query = dbUri.getQuery();
                    String jdbcUrl = "jdbc:postgresql://" + host + ":" + port + path;
                    if (query != null && !query.isBlank()) {
                        jdbcUrl += "?" + query;
                    } else {
                        jdbcUrl += "?sslmode=require";
                    }

                    log.info("Connecting to Cloud PostgreSQL at: {}", host + ":" + port + path);

                    config.setJdbcUrl(jdbcUrl);
                    config.setUsername(username);
                    config.setPassword(password);
                    config.setDriverClassName("org.postgresql.Driver");
                    config.setMaximumPoolSize(10);
                    config.setConnectionTimeout(30000);
                    return new HikariDataSource(config);
                } catch (Exception e) {
                    log.error("Failed to parse DATABASE_URL URI: {}", e.getMessage(), e);
                    throw new RuntimeException("Invalid DATABASE_URL format: " + e.getMessage(), e);
                }
            } else if (dbUrlEnv.startsWith("jdbc:")) {
                log.info("Connecting with provided JDBC URL");
                config.setJdbcUrl(dbUrlEnv);
                config.setUsername(System.getenv("DB_USER") != null ? System.getenv("DB_USER") : defaultUser);
                config.setPassword(System.getenv("DB_PASSWORD") != null ? System.getenv("DB_PASSWORD") : defaultPassword);
                config.setDriverClassName("org.postgresql.Driver");
                return new HikariDataSource(config);
            }
        }

        // 2. If running locally on Mac laptop (fallback to local PostgreSQL)
        String osName = System.getProperty("os.name", "").toLowerCase();
        boolean isLocalMac = osName.contains("mac") || osName.contains("darwin");
        
        if (isLocalMac && (defaultUrl == null || defaultUrl.isBlank())) {
            defaultUrl = "jdbc:postgresql://localhost:5432/school_db";
        }

        if (defaultUrl != null && !defaultUrl.isBlank()) {
            log.info("Connecting to local database: {}", defaultUrl);
            config.setJdbcUrl(defaultUrl);
            config.setUsername(defaultUser);
            config.setPassword(defaultPassword);
            config.setDriverClassName("org.postgresql.Driver");
            return new HikariDataSource(config);
        }

        // 3. Clear, friendly error if running on cloud without DATABASE_URL
        log.error("=========================================================================");
        log.error("CONFIGURATION ERROR: No DATABASE_URL found in Render Environment!");
        log.error("Please go to Render Dashboard -> Web Service -> Environment");
        log.error("Add variable: DATABASE_URL = your Supabase connection string");
        log.error("=========================================================================");
        throw new IllegalStateException(
            "Missing DATABASE_URL! Please add the DATABASE_URL environment variable in your Render Web Service Environment tab."
        );
    }
}
