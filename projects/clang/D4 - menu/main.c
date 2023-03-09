#include <stdio.h>
#include <stdlib.h>
#define NULL 0
int line = 0;
int inPage = 0;
char items[3][10] = {{"home"},{"contact"},{"exit"}};

int main()
{
    menu();
    char n = getch();
    do
    {
        if(n == -32) //extended key
        {
            switch (getch())
            {
            case 72: // up
                if(line == 0)
                {
                    line = 3;
                }
                else if(line == 1)
                {
                    line = 3;
                }
                else
                {
                    line--;
                }
                menu();
                break;
            case 80: // down
                if(line == 0)
                {
                    line = 1;
                }
                else if(line == 3)
                {
                    line = 1;
                }
                else
                {
                    line++;
                }
                menu();
                break;
            case 13 :
                if(line != 0)
                {
                    switch (line)
                    {
                    case 1: // home
                        inPage = 1;
                        system("cls");
                        printf("Home page :: to go to back press backspace");
                        backspace();
                        break;
                    case 2: // contact
                        inPage = 2;
                        system("cls");
                        printf("contact page :: to go to back press backspace");
                        backspace();
                        break;
                    case 3: // exit
                        inPage = 3;
                        exit(0);
                        break;
                    }
                }
                break;
            case 8 :
                menu();
                backspace();
                break;
            }
        }
    }
    while(n != 13 || inPage != 3);
    backspace();


    return 0;
}

void menu()
{
    int i;
    system("cls");
    printf("line : %d\n", line);
    for(i=0; i<3; i++)
    {
        if(line == i+1)
        {
            printf("\033[0;31m {%s} \033[0m\n", items[i]);
        }
        else
        {
            printf("%s\n", items[i]);
        }
    }
}

void backspace()
{
    if(inPage == 0)
    {
        exit(0);
    }
}
