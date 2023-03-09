#include <stdio.h>
#include <stdlib.h>

int main()
{
    int count=0,o,z;
    char chars;
    char c[100];
    scanf("%s", c);
    //printf("test number 1");
    //printf("Char : %s\n", c);

    //printf("number : %c\n",c[i]);

        for(z = 65; z<=90; z++)
        {
            for(int i=0; i<100 || c[i] == '\0'; i++)
            {
                if((c[i]>=97 && c[i]<=125))
                {
                    c[i] -=32;
                }
                if(z == c[i])
                {
                    count++;
                }

            if(c[i] == '\0')break;
            }
            if(count>0){
                printf("%c : %d\n", z, count);
            }
            count = 0;
        }

    return 0;
}
