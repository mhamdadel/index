#include <stdio.h>
#include <stdlib.h>
int len(char[]);

char c1[100] ="hello ";
char c2[20] = "mohamed";
int main()
{
    for(int i = 0; i < 100-len(c2) ; i++)
    {
        c1[i+len(c2)-1] = c2[i];
    }
    printf("c1 : %s",c1);
    return 0;
}


int len(char c2[])
{
    int count = 0;
    for(int i = 0 ; i<100 ; i++)
    {
        if(c2[i] != '\0')
        {
            count++;
        }
        else
        {
            break;
        }
    }
    return count;
}
