package it.akademija.wizards.models.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

public class UserUpdateCommand {

    @NotNull(message = "Firstname is required")
    private String firstname;

    @NotNull(message = "Lastname is required")
    private String lastname;

    @Email(message = "Email format is invalid")
    private String email;

    @NotNull(message = "Admin status is required")
    private boolean isAdmin;

    public UserUpdateCommand(@NotNull(message = "Firstname is required") String firstname,
                             @NotNull(message = "Lastname is required") String lastname,
                             @Email(message = "Email format is invalid") String email,
                             @NotNull(message = "Admin status is required") boolean isAdmin) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.isAdmin = isAdmin;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }
}
