import java.util.Scanner;

public class SpeedConverter {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Prompt the user for input
        System.out.print("Enter speed: ");
        double speed = scanner.nextDouble();

        System.out.println("Choose conversion unit:");
        System.out.println("1: Meters per second (m/s)");
        System.out.println("2: Kilometers per hour (km/h)");
        System.out.println("3: Miles per hour (mph)");
        System.out.print("Enter your choice (1-3): ");
        int choice = scanner.nextInt();

        switch (choice) {
            case 1:
                // Convert to meters per second
                double mps = kmhToMps(speed);
                System.out.printf("%.2f km/h is %.2f m/s%n", speed, mps);
                break;
            case 2:
                // Convert to kilometers per hour
                double kmh = mpsToKmh(speed);
                System.out.printf("%.2f m/s is %.2f km/h%n", speed, kmh);
                break;
            case 3:
                // Convert to miles per hour
                double mph = kmhToMph(speed);
                System.out.printf("%.2f km/h is %.2f mph%n", speed, mph);
                break;
            default:
                System.out.println("Invalid choice. Please select 1, 2, or 3.");
        }

        // Close the scanner
        scanner.close();
    }

    // Method to convert km/h to m/s
    public static double kmhToMps(double kmh) {
        return kmh * 1000 / 3600;
    }

    // Method to convert m/s to km/h
    public static double mpsToKmh(double mps) {
        return mps * 3600 / 1000;
    }

    // Method to convert km/h to mph
    public static double kmhToMph(double kmh) {
        return kmh * 0.621371;
    }
}
