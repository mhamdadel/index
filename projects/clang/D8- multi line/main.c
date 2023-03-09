#include <stdio.h>
#include <stdlib.h>
#include<windows.h>
#include <time.h>
#include "mylibrary.h"
#define maxs 75
#define maxY 20

int main()
{
    char s[maxY][maxs] = {{' '}};
    int current = 0;
    int currentY = 0;
    int max = 0;
    char l;
    do
    {
        textattr(1);
        char l = getch();
        if(l == -32)
        {
            char z = getch();
            if(z == 71)
            {
                current=0;
                gotoxy(0, currentY);
            }
            else if(z == 79)
            {
                current =max;
                gotoxy(max,currentY);
            }
            else if(z == 77)
            {
                if(current < maxs)
                {
                    current++;
                    gotoxy(current, currentY);
                }
                else if(currentY < maxY)
                {
                    currentY++;
                    gotoxy(0, currentY);
                }
            }
            else if (z == 72)   //upper
            {
                currentY--;
                gotoxy(current, currentY);
            }
            else if (z == 80)  //down
            {
                currentY++;
                current = 0;
                gotoxy(current, currentY);
            }
            else if(z == 75)
            {
                if(current > 0)
                {
                    current--;
                    gotoxy(current, currentY);
                }
                else if(currentY > 0)
                {
                    currentY--;
                    current =0;
                    gotoxy(current, currentY);
                }
            }
            else if(z == 83)
            {
                if(current > -1)
                {
                    system("cls");
                    textattr(1);
                    int oto = 0;
                    for(int ko = 0; ko < maxs-1 ; ko++)
                    {
                        if(ko > current)
                        {
                            s[currentY][current+oto] = s[currentY][current+oto+1];
                            oto++;
                        }
                    }
                    int cooo = 0,sooo=0;
                    printf("\n");
                    gotoxy(0,0);
                    for(sooo=0; sooo<maxY; sooo++)
                    {
                        for(cooo = 0; cooo < maxs ; cooo++)
                        {
                            printf("%c",s[sooo][cooo]);
                        }
                        printf("\n");
                    }
                    max--;
                    gotoxy(current,currentY);
                }
            }
        }
        else
        {
            if(
                ((l >= 45 && l <= 130) )
                && current < 25
            )
            {
                printf("%c", l);
                s[currentY][current] = l;
                current++;
            }
            else if(l == 32) //disabled space function
            {
                s[currentY][current] = ' ';
                putch(' \b ');
                current++;
                gotoxy(current, currentY);
            }
            else if(l == 8)
            {
                if(current > 0)
                {
                    /**/
                    system("cls");
                    textattr(1);
                    int oto = 0;

                    for(int ko = current; ko < maxs; ko++)
                    {
                        s[currentY][ko-1] = s[currentY][ko];
                    }
                    gotoxy(0,0);
                    int cooo = 0,sooo=0;
                    for(sooo=0; sooo<maxY; sooo++)
                    {
                        for(cooo = 0; cooo < maxs ; cooo++)
                        {
                            printf("%c",s[sooo][cooo]);
                        }
                        printf("\n");
                    }
                    max--;
                    if(current > 0)
                    {
                        current--;
                    }
                    gotoxy(current,currentY);
                }
            }
            else if(l == 13)
            {
                break;
                l =13;
            }
            else if (l == 32)
            {
                current++;
                gotoxy(current,currentY);
            }
        }
        if(max < current)
        {
            max = current;
        }
        fflush(stdin);
    }
    while (l != 13);
    int coo = 0,soo=0;
    printf("\n--------------------------------your text-----------------------------------------\n");
    for(soo=0; soo<maxs/5; soo++)
    {
        for(coo = 0; coo < maxs ; coo++)
        {
            printf("%c",s[soo][coo]);
        }
        printf("\n");
    }

    return 0;
}
