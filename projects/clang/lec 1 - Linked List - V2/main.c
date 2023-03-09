#include <stdio.h>
#include <stdlib.h>
#include "linked_list.h"

int main()
{
    LinkedList intgers;
    intgers.head = NULL ;
    intgers.tail = NULL;
    Add(&intgers, 3);
    Add(&intgers, 4);
    Add(&intgers, 8);
    Add(&intgers, 5);
    Display(&intgers);

    printf("\nget node by data : %d", GetNodeByData(&intgers, 4)->data);
    InsertAfter(&intgers, 55,4);
    InsertAfter(&intgers, 66,55);
    Display(&intgers);
    printf("\ncount : %d", GetCount(&intgers));
    printf("\nGet data by index : %d\n", GetDataByIndex(&intgers, 2));
    DeleteNode(&intgers, 4);
    Display(&intgers);
    printf("\nget index node by data : %d\n", GetNodeByData(&intgers, 55)->index);

    return 0;
}
