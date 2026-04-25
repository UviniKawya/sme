package com.sme.digitalreadiness.config;

import org.thymeleaf.extras.java8time.dialect.Java8TimeDialect;
import org.thymeleaf.extras.springsecurity6.dialect.SpringSecurityDialect;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.spring6.view.ThymeleafViewResolver;
import org.thymeleafstandarddialect.StandardDialect;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.HashSet;
import java.util.Set;

@Configuration
public class ThymeleafConfig implements WebMvcConfigurer {

    @Bean
    public SpringTemplateEngine templateEngine(org.thymeleaf.spring6.SpringResourceTemplateResolver templateResolver) {
        SpringTemplateEngine engine = new SpringTemplateEngine();
        engine.setTemplateResolver(templateResolver);
        engine.setEnableSpringELCompiler(true);

        Set<org.thymeleaf.dialect.IDialect> dialects = new HashSet<>();
        dialects.add(new StandardDialect());
        dialects.add(new Java8TimeDialect());
        // Optional: Spring Security dialect if security is added
        // dialects.add(new SpringSecurityDialect());

        engine.setAdditionalDialects(dialects);
        return engine;
    }

    @Bean
    public ThymeleafViewResolver thymeleafViewResolver(SpringTemplateEngine templateEngine) {
        ThymeleafViewResolver resolver = new ThymeleafViewResolver();
        resolver.setTemplateEngine(templateEngine);
        resolver.setCharacterEncoding("UTF-8");
        resolver.setOrder(1);
        return resolver;
    }
}
