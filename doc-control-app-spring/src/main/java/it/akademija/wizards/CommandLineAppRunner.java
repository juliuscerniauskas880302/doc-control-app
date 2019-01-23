package it.akademija.wizards;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CommandLineAppRunner implements CommandLineRunner {

    private final Logger logger = LoggerFactory.getLogger(CommandLineAppRunner.class);

    @Override
    public void run(String... args) throws Exception {

    }
}
