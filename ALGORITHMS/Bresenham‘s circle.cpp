#include <iostream>
#include <graphics.h>
using namespace std;

class Graphics 
{
    private:
    int gd, gm;
    public:
    Graphics()  
    {
        int gd = DETECT, gm;
        initgraph(&gd, &gm,NULL);
    }

    void drawLine(int x1, int y1, int x2, int y2) 
    {
        float dx = x2 - x1;
        float dy = y2 - y1;
        float steps = (abs(dx) > abs(dy)) ? abs(dx) : abs(dy);
        float xInc = dx / steps;
        float yInc = dy / steps;
        float x = x1, y = y1;

        for (int i = 0; i <= steps; i++) 
        {
            putpixel(x, y,BLUE);
            x += xInc;
            y += yInc;
        }
    }

    void drawCircle(int x, int y, int r)
     {
        int d = 3 - 2 * r;
        int x1 = 0, y1 = r;

        while (x1 <= y1) 
        {
            putpixel(x + x1, y - y1, WHITE);
            putpixel(x + y1, y - x1, WHITE);
            putpixel(x - x1, y - y1, WHITE);
            putpixel(x - y1, y - x1, WHITE);
            putpixel(x + x1, y + y1, WHITE);
            putpixel(x + y1, y + x1, WHITE);
            putpixel(x - x1, y + y1, WHITE);
            putpixel(x - y1, y + x1, WHITE);

            if (d < 0)
            {
                d += 4 * x1 + 6;
            } 
            else 
            {
                d += 4 * (x1 - y1) + 10;
                y1--;
            }
            x1++;
        }
    }

    void drawInnerCircle(int x, int y, int r)
    {
        int d = 3 - 2 * r;
        int x1 = 0, y1 = r;

        while (x1 <= y1) 
        {
            putpixel(x + x1, y - y1, RED);
            putpixel(x + y1, y - x1, RED);
            putpixel(x - x1, y - y1, RED);
            putpixel(x - y1, y - x1, RED);
            putpixel(x + x1, y + y1, RED);
            putpixel(x + y1, y + x1, RED);
            putpixel(x - x1, y + y1, RED);
            putpixel(x - y1, y + x1, RED);

            if (d < 0) 
            {
                d += 4 * x1 + 6;
            } else 
            {
                d += 4 * (x1 - y1) + 10;
                y1--;
            }
            x1++;
        }
    }

    void drawPattern() 
    {
        
        
        drawLine(210,160, 166, 235);
        drawLine(254, 235, 210, 160);
        drawLine(166, 235,254,235);
        drawCircle(210, 210, 50);
        drawInnerCircle(210, 210, 25);
    }
};
 
int main()
{
	std::string name="";
	cout<<"Enter name "<<endl;
	cin>>name;
	cout<<"Entered name is:"<<name<<endl;   
	Graphics g;
	g.drawPattern();
	getch();
	return 0;
}