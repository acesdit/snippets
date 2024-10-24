import java.util.Scanner;

class MultiPlicationOfMatrix {
    public static void main(String[] args) {
        Scanner s = new Scanner(System.in);

        
        int[][] mat1 = new int[2][2];
        int[][] mat2 = new int[2][2];
        int[][] result = new int[2][2];

        
        System.out.println("Enter elements :");
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                mat1[i][j] = s.nextInt();
            }
        }

        
        System.out.println("Enter elements :");
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                mat2[i][j] = s.nextInt();
            }
        }

        
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                result[i][j] = 0;
            }
        }

        
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                for (int k = 0; k < 2; k++) {
                    result[i][j] += mat1[i][k] * mat2[k][j];
                }
            }
        }

        
        System.out.println("Resultant matrix ");
        for (int i = 0; i < 2; i++) {
            for (int j = 0; j < 2; j++) {
                System.out.print(result[i][j] + " ");
            }
            System.out.println();
        }

      
    }
}
