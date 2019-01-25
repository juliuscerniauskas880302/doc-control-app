package it.akademija.wizards.security;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Hex;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

public class PasswordChecker {
    private static final String ALGORITHM = "PBKDF2WithHmacSHA512";
    private static final int ITERATIONS = 10000;
    private static final int HASH_SIZE = 512;

    public boolean checkPasswordMatching(String enteredPassword, byte[] passFromDB, byte[] saltFromDB) {

        try {
            byte[] salt = saltFromDB;
            char[] password = enteredPassword.toCharArray();
            SecretKeyFactory secretKeyFactory = SecretKeyFactory.getInstance(ALGORITHM);
            byte[] hash = calculateHash(secretKeyFactory, password, salt);
            return comparePasswords(passFromDB, hash);

        } catch (NoSuchAlgorithmException | InvalidKeySpecException ex) {
            ex.printStackTrace();
            return false;
        }
    }

    private byte[] calculateHash(SecretKeyFactory secretKeyFactory, char[] password, byte[] salt) throws InvalidKeySpecException {
        PBEKeySpec spec = new PBEKeySpec(password, salt, ITERATIONS, HASH_SIZE);
        return secretKeyFactory.generateSecret(spec).getEncoded();
    }

    private boolean comparePasswords(byte[] originalHash, byte[] comparisonHash) {
        int diff = originalHash.length ^ comparisonHash.length;
        for (int i = 0; i < originalHash.length && i < comparisonHash.length; i++) {
            diff |= originalHash[i] ^ comparisonHash[i];
        }
        return diff == 0;
    }
}
