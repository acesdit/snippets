import java.util.Scanner;

class Test {
    public static void spiral(int arr[][], int r, int c) {
        int cnt = 0;
        int tot = r * c;
        int startingrow = 0;
        int startingcol = 0;
        int endingrow = r - 1;
        int endingcol = c - 1;

        while (cnt < tot) {
            // Starting row printing
            for (int i = startingcol; i <= endingcol; i++) {
                System.out.print(arr[startingrow][i] + " ");
                cnt++;
            }
            startingrow++;

            // Ending column printing
            for (int i = startingrow; i <= endingrow; i++) {
                System.out.print(arr[i][endingcol] + " ");
                cnt++;
            }
            endingcol--;

            // Ending row printing 
            for (int i = endingcol; i >= startingcol; i--) {
                System.out.print(arr[endingrow][i] + " ");
                cnt++;
            }
            endingrow--;
            

            // Starting column printing 
            
            for (int i = endingrow; i >= startingrow; i--) {
				System.out.print(arr[i][startingcol] + " ");
                cnt++;
            }
            startingcol++;
            
        }
    }
}

class Exercise18{
    public static void main(String args[]) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Enter ");
        int N = scanner.nextInt();
        System.out.println("Enter ");
        int M = scanner.nextInt();

        int[][] matrix = new int[N][M];
        System.out.println("Enter the elements of the matrix: ");
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                matrix[i][j] = scanner.nextInt();
            }
        }

        System.out.println("Spiral Order: ");
        Test.spiral(matrix, N, M);

    }
}
