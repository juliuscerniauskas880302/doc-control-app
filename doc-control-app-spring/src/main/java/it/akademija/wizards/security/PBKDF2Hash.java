package it.akademija.wizards.security;

import org.apache.commons.codec.binary.Hex;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;

public class PBKDF2Hash {
    private static final String ALGORITHM = "PBKDF2WithHmacSHA512";
    private static final int ITERATIONS = 10000;
    private static final int SALT_SIZE = 32;
    private static final int HASH_SIZE = 512;

    public PassAndSalt hashPassword(String enteredPassword) {
        char[] password = enteredPassword.toCharArray();

        try {
            SecretKeyFactory secretKeyFactory = SecretKeyFactory.getInstance(ALGORITHM);
            byte[] salt = generateSalt();
            byte[] hash = calculateHash(secretKeyFactory, password, salt);
            boolean correct = verifyPassword(secretKeyFactory, hash, password, salt);
            if (correct) {
                return new PassAndSalt(hash, salt);
            } else {
                return null;
            }
        } catch (NoSuchAlgorithmException | InvalidKeySpecException ex) {
            ex.printStackTrace();
            return null;
        }
    }

    private boolean verifyPassword(SecretKeyFactory secretKeyFactory, byte[] originalHash, char[] password, byte[] salt) throws InvalidKeySpecException {
        byte[] comparisonHash = calculateHash(secretKeyFactory, password, salt);

        return comparePasswords(originalHash, comparisonHash);
    }

    private byte[] calculateHash(SecretKeyFactory secretKeyFactory, char[] password, byte[] salt) throws InvalidKeySpecException {
        PBEKeySpec spec = new PBEKeySpec(password, salt, ITERATIONS, HASH_SIZE);
        return secretKeyFactory.generateSecret(spec).getEncoded();
    }

    private byte[] generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[SALT_SIZE];
        random.nextBytes(salt);

        return salt;
    }

    private boolean comparePasswords(byte[] originalHash, byte[] comparisonHash) {
        int diff = originalHash.length ^ comparisonHash.length;
        for (int i = 0; i < originalHash.length && i < comparisonHash.length; i++) {
            diff |= originalHash[i] ^ comparisonHash[i];
        }
        return diff == 0;
    }
}
