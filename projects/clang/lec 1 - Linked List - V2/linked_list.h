#ifndef LINKED_LIST_HEADER_INCLUDED
#define LINKED_LIST_HEADER_INCLUDED
// make double direction linked list
typedef struct Node Node;
struct Node
{
    int index;
    int data;
    Node *prev, *next;
};
typedef struct LinkedList
{
    Node *head;
    Node *tail;
} LinkedList;

void Add(LinkedList * ls, int data)
{
    Node *newNode = malloc(sizeof(Node));
    newNode->data = data;
    newNode->prev = newNode->next = NULL;
    if(ls->head == NULL)
    {
        newNode->index = 0;
        ls->head = ls->tail = newNode;
        newNode->index = ls->head->index = ls->tail->index = 0;
    }
    else
    {
        ls->tail->next = newNode;
        newNode->prev = ls->tail;
        ls->tail = newNode;
        ls->tail->index = NULL;
        newNode->index = (int)newNode->prev->index + 1;
    }
}

void Display(LinkedList * ls)
{
    Node *current = ls->head;
    while (current != NULL)
    {
        printf("%d\t", current->data);
        current = current->next;
    }
}

Node *GetNodeByData(LinkedList * ls, int data)
{
    Node *current = ls->head;
    while (current != NULL)
    {
        if(data == current->data)
        {
            return current;
        }
        current = current->next;
    }
    return NULL;
}

void DeleteNode(LinkedList * ls, int data)
{
    Node *node = GetNodeByData(ls, data);
    if(node == NULL)
    {
        return;
    }
    else
    {
        int isAfterEdit = 0;
        Node *current = node;
        while (current != NULL)
        {
            if(isAfterEdit == 1)
            {
                current->index--;
            }
            if(node->data == current->data)
            {
                isAfterEdit = 1;
            }
            current = current->next;
        }
        if(node == ls->head)
        {
            if(node == ls->tail)
            {
                ls->head = ls->tail = NULL;
            }
            else
            {
                ls->head = ls->head->next;
                ls->head->prev = NULL;
            }
        }
        else if(node == ls->tail)
        {
            ls->tail = ls->tail->prev;
            ls->tail->next = NULL;
        }
        else
        {
            Node *prev = node->prev;
            Node *next = node->next;
            prev->next = next;
            next->prev = prev;
        }
        free(node);
    }
}
void InsertAfter(LinkedList * ls, int data, int AfterData)
{
    Node *node = GetNodeByData(ls, AfterData);
    Node *newNode = malloc(sizeof(Node));
    newNode->data = data;
    newNode->prev = newNode->next = newNode->index = NULL;
    if(node == NULL)
    {
        return;
    }
    else
    {
        if(node == ls->tail)
        {
            Add(ls, data);
            newNode->index = node->index + 1;
        }
        else
        {
            newNode->prev = node;
            newNode->next = node->next;

            node->next->prev = newNode;
            node->next = newNode;

            newNode->index = node->index + 1;

            int isAfterEdit = 0;
            Node *current = newNode;
            while (current != NULL)
            {
                if(isAfterEdit == 1)
                {
                    current->index++;
                }
                if(newNode->data == current->data)
                {
                    isAfterEdit = 1;
                }
                current = current->next;
            }

        }
    }
}
int GetCount(LinkedList * ls)
{
    //return ls->tail->index+1;
    Node *current = ls->head;
    int counter = 0;
    while (current != NULL)
    {
        current = current->next;
        counter++;
    }
    return counter;
}
int *GetDataByIndex(LinkedList * ls, int index)
{
    Node *current = ls->head;
    if(index + 1 < GetCount(ls))
    {
        while (current != NULL)
        {
            if(index == current->index)
            {
                return current->data;
            }
            current = current->next;
        }
    }
}


#endif // LINKED_LIST_HEADER_INCLUDED
