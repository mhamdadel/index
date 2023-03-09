#include <stdio.h>
#include <stdlib.h>
#define NOEMP 5

typedef struct EmpArr_of_Struct
{
    int id;
    int salary;
    int bouns;
    int deduction;
    char name[20];
} EmpArr_of_Struct;

//EmpArr_of_Struct emp[NOEMP] = {{101, 4000, 200, 500,"Muhammed"},{103, 5000, 500, 1000,"Soltan"}};


void AddNewEmployee(EmpArr_of_Struct emp[]);
void DisplayEmpoyee(EmpArr_of_Struct emp[], int);
void DisplayEmpoyees(EmpArr_of_Struct emp[]);
void highLight(EmpArr_of_Struct emp[]);
void menu(EmpArr_of_Struct emp[]);

int CountEmp = 0;
int line = 0;
int inPage = 0;

int main()
{
    /*
    4- Employee with functions and Highlight Menu: Menu of Array_Of_Struct
    */
    EmpArr_of_Struct * emp = (EmpArr_of_Struct *) malloc (NOEMP * sizeof(EmpArr_of_Struct));
    menu(emp);
    highLight(emp);




    return 0;
}

void AddNewEmployee(EmpArr_of_Struct emp[])
{
    printf("please enter employee NO{%d} id : ", CountEmp+1);
    scanf("%d", &emp[CountEmp].id);
    printf("please enter employee NO{%d} name :", CountEmp+1);
    scanf("%s", emp[CountEmp].name);
    printf("please enter employee NO{%d} salary : ", CountEmp+1);
    scanf("%d", &emp[CountEmp].salary);
    printf("please enter employee NO{%d} bouns : ", CountEmp+1);
    scanf("%d", &emp[CountEmp].bouns);
    printf("please enter employee NO{%d} deduction : ", CountEmp+1);
    scanf("%d", &emp[CountEmp].deduction);
    CountEmp++;
}

void DisplayEmpoyee(EmpArr_of_Struct emp[],int id_of_emp)
{
    for(int i = id_of_emp; i <= id_of_emp; i++)
    {
        printf("\nemployee info NO{%d} : ....",i+1);
        printf("\ncode : %d",emp[i].id);
        printf("\nname : %s",emp[i].name);
        printf("\nsalary : %d",emp[i].salary + emp[i].bouns - emp[i].deduction);
        printf("\n--------------------------\n");
    }
}
void DisplayEmpoyees(EmpArr_of_Struct emp[])
{
    system("cls");
    for(int i = 0; i < CountEmp; i++)
    {
        printf("\nemployee info NO{%d} : ....",i+1);
        printf("\ncode : %d",emp[i].id);
        printf("\nname : %s",emp[i].name);
        printf("\nsalary : %d",emp[i].salary + emp[i].bouns - emp[i].deduction);
        printf("\n--------------------------\n");
    }
}
void highLight(EmpArr_of_Struct emp[])
{
    //menu();

    do
    {
        char n = getch();
        if(n == -32)
        {
            switch (getch())
            {
            case 72: // up
                if(line == 0)
                {
                    line = CountEmp;
                }
                else if(line == 1)
                {
                    line = CountEmp;
                }
                else
                {
                    line--;
                }
                menu(emp);
                break;
            case 80: // down
                if(line == 0)
                {
                    line = 1;
                }
                else if(line == CountEmp)
                {
                    line = 1;
                }
                else
                {
                    line++;
                }
                menu(emp);
                break;
            case 13 :
                if(line != 0)
                {
                    int kok = 0;
                    //for(kok = 0;kok < NOEMP; kok++)
                    switch (line)
                    {
                    case 1: // home
                        inPage = 1;
                        system("cls");
                        DisplayEmpoyee(emp, line-1);
                        getch();
                        break;
                    case 2: // contact
                        inPage = 2;
                        system("cls");
                        DisplayEmpoyee(emp, line-1);
                        getch();
                        break;
                    case 3: // exit
                        inPage = 2;
                        system("cls");
                        DisplayEmpoyee(emp, line-1);
                        getch();
                        break;

                    case 4: // exit
                        inPage = 2;
                        system("cls");
                        DisplayEmpoyee(emp, line-1);
                        break;

                    case 5: // exit
                        inPage = 2;
                        system("cls");
                        DisplayEmpoyee(emp, line-1);
                        break;

                    }
                case 8:
                    menu(emp);
                    break;
                case 'd':
                    DisplayEmpoyees(emp);
                    break;
                case 'n':
                    AddNewEmployee(emp);
                    break;
                }
                break;
            }
        }else if (n == 13){
             if(line != 0)
                {
                    switch (line)
                    {
                    case 1: // home
                        inPage = 1;
                        system("cls");
                        DisplayEmpoyee(emp, line-1);
                        getch();
                        break;
                    case 2: // contact
                        inPage = 2;
                        system("cls");
                        DisplayEmpoyee(emp, line-1);
                        getch();
                        break;
                    case 3: // exit
                        inPage = 2;
                        system("cls");
                        DisplayEmpoyee(emp, line-1);
                        getch();
                        break;

                    case 4: // exit
                        inPage = 2;
                        system("cls");
                        DisplayEmpoyee(emp, line-1);
                        break;

                    case 5: // exit
                        inPage = 2;
                        system("cls");
                        DisplayEmpoyee(emp, line-1);
                        break;

                    }
                }
        }else if(n == 'd'){
            DisplayEmpoyees(emp);
        }else if(n == 'n'){
            AddNewEmployee(emp);
        }else if(n == 8){
            menu(emp);
        }else{
            menu(emp);
        }

    }
    while(1);
    backspace();


    return 0;
}

void menu(EmpArr_of_Struct emp[])
{
    int i;
    system("cls");
    printf("press n to create new user, press d to display all employees\n");
    printf("line : %d\n", line);
    for(i=0; i<CountEmp; i++)
    {
        if(line == i+1)
        {
            printf("\033[0;7m {%s} \033[0;31m to delete user press (DEL) this future isn't exist now \033[0m\n", emp[i].name);
        }
        else
        {
            printf("%s\n", emp[i].name);
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
