import java.util.Scanner;
class Test{
	void pai(int arr[],int key)
	{
		int a=0;
		int b=arr.length-1;
		while(a<b)
		{
			int add=arr[a]+arr[b];
			if(add==key)
			{
				System.out.println("("+arr[a]+","+arr[b]+")");
				
				a++;
				b--;
			}
			else if(add<key)
			{
					a++;
			}
			else{
				b--;
			}
		}
	}
}
class PairSum{
	public static void main(String args[])
	{
		Test t=new Test();
		
		int arr[]={1,2,3,4,6,7,8};
		int sum=7;
		t.pai(arr,sum);
	}
}

		