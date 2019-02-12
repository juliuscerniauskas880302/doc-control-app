package it.akademija.wizards.services;

import it.akademija.wizards.DocApplication;
import org.hamcrest.CoreMatchers;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import javax.validation.constraints.AssertFalse;
import javax.validation.constraints.AssertTrue;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment=SpringBootTest.WebEnvironment.RANDOM_PORT, classes= {DocApplication.class})
public class UserServiceTest {
//USEFUL FOR CONTROLLER TESTS
//    private static final String URI = "/users";
//    @Autowired
//    private TestRestTemplate rest;

    @Autowired
    private UserService userService;

    @Test
    public void shouldCorrectlyCheckIfUserCanSubmitDocuments() {
        boolean isJuliusAllowed = userService.isActionAllowed("julius", "submit");
        boolean isMigleAllowed = userService.isActionAllowed("migle", "submit");
        Assert.assertTrue(isJuliusAllowed);
        Assert.assertTrue(isMigleAllowed);
    }

    @Test
    public void shouldCorrectlyCheckIfUserCanReviewDocuments() {
        boolean isJuliusAllowed = userService.isActionAllowed("julius", "review");
        boolean isMigleAllowed = userService.isActionAllowed("migle", "review");
        Assert.assertFalse(isJuliusAllowed);
        Assert.assertTrue(isMigleAllowed);
    }
}