package it.akademija.wizards.models.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

public class UserCreateCommand {

    @NotNull(message = "Username is required")
    private String username;

    @NotNull(message = "Password is required")
    private String password;

    @NotNull(message = "Firstname is required")
    private String firstname;

    @NotNull(message = "Lastname is required")
    private String lastname;

    @Email(message = "Email format is invalid")
    private String email;

    @NotNull(message = "Admin status is required")
    private boolean isAdmin;
}
