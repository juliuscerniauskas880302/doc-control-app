package it.akademija.wizards.security;

public class PassAndSalt {

    private byte[] password;
    private byte[] salt;

    public PassAndSalt(byte[] password, byte[] salt) {
        this.password = password;
        this.salt = salt;
    }

    public byte[] getPassword() {
        return password;
    }

    public void setPassword(byte[] password) {
        this.password = password;
    }

    public byte[] getSalt() {
        return salt;
    }

    public void setSalt(byte[] salt) {
        this.salt = salt;
    }
}
