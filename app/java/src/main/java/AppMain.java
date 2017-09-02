import api.UserApi;
import com.gft.pratice.workshop.ApiClient;
import model.User;

import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

public class AppMain {

    private static UserApi userApi = new UserApi();
    private static String[] firstNames = {"Jose", "Vania", "Giulia", "Pedro", "Rafael", "Bruno"};
    private static String[] lastNames = {"Oliveira", "Santos", "Silva", "Almeida", "Tavares", "Albuquerque"};

    public static void main(String[] args) {


        for (int i = 0; i < 10; i++) {
            userApi.createUser(newUser());
        }

        for (User user :
                userApi.getUsers(null, null)) {
            System.out.println(user.toString());
        }

    }

    public static User newUser() {


        User user = new User();
        user.setFirstName(getNextFirstName());
        user.setLastName(getNextLastName());
        user.setEmail(user.getFirstName().toLowerCase() + "." + user.getLastName().toLowerCase() + "@nononom.com");
        user.setPassword("dr#45@34");
        user.setPhone("233332333");
        user.setUsername(user.getFirstName().substring(0, 2).toLowerCase() + user.getLastName().substring(0, 2).toLowerCase());
        user.setId(Long.valueOf(0));

        return user;

    }

    public static String getNextFirstName() {
        return firstNames[ThreadLocalRandom.current().nextInt(0, firstNames.length)];
    }

    public static String getNextLastName() {
        return firstNames[ThreadLocalRandom.current().nextInt(0, firstNames.length)];
    }
}
