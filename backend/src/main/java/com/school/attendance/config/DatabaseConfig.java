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

    @Value("${spring.datasource.url:jdbc:postgresql://localhost:5432/school_db}")
    private String defaultUrl;

    @Value("${spring.datasource.username:postgres}")
    private String defaultUser;

    @Value("${spring.datasource.password:postgres}")
    private String defaultPassword;

    @Bean
    @Primary
    public DataSource dataSource() {
        String dbUrlEnv = System.getenv("DATABASE_URL");
        if (dbUrlEnv == null || dbUrlEnv.isBlank()) {
            dbUrlEnv = System.getenv("DB_URL");
        }

        HikariConfig config = new HikariConfig();

        // Check if a cloud PostgreSQL URL (Render / Supabase / Neon / Heroku format) is provided
        if (dbUrlEnv != null && (dbUrlEnv.startsWith("postgres://") || dbUrlEnv.startsWith("postgresql://"))) {
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

                String jdbcUrl = "jdbc:postgresql://" + host + ":" + port + path;
                log.info("Cloud PostgreSQL detected. Converted to JDBC URL: {}", jdbcUrl);

                config.setJdbcUrl(jdbcUrl);
                config.setUsername(username);
                config.setPassword(password);
                config.setDriverClassName("org.postgresql.Driver");
                return new HikariDataSource(config);
            } catch (Exception e) {
                log.warn("Could not parse cloud DATABASE_URL URI: {}. Falling back to default properties.", e.getMessage());
            }
        }

        // Standard JDBC connection fallback (Localhost or explicit DB_URL)
        String targetUrl = (dbUrlEnv != null && dbUrlEnv.startsWith("jdbc:")) ? dbUrlEnv : defaultUrl;
        config.setJdbcUrl(targetUrl);
        config.setUsername(System.getenv("DB_USER") != null ? System.getenv("DB_USER") : defaultUser);
        config.setPassword(System.getenv("DB_PASSWORD") != null ? System.getenv("DB_PASSWORD") : defaultPassword);
        config.setDriverClassName("org.postgresql.Driver");
        return new HikariDataSource(config);
    }
}
