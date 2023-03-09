#include <stdio.h>
#include <stdlib.h>
int len(char[]);
int main()
{
    char c[100] = "[GH]MohamedAdel--!!";
    char f[100];
    int o = 0;
    for(int i = 0; i<len(c); i++){
        if(
           (c[i]>=65 && c[i]<=90)
           ||(c[i]>=95 && c[i]<=122)
           ){
            f[o] = c[i];
            o++;
        }
    }
    printf("%s", f);
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
