package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
)

type User struct {
    ID int `json:"id"`
    Name string `json:"name"`
    Password string `json:"password"`
}


type Todo struct {
    ID int `json:"id"`
    Title string `json:"title"`
    Body string `json:"body"`
    Done bool `json:"done"`
    Tipe string`json:"tipe"`
    Time string`json:"time"`
}

var (
    users []User
    todos []Todo
)

func healthCheck(c *fiber.Ctx) error {

}

func loginHandler(c *fiber.Ctx) error  {
    
}
func registerHandler(c *fiber.Ctx) error  {
    
}
func logoutHandler(c *fiber.Ctx) error  {
    
}

func getTodoHandler(c *fiber.Ctx) error  {
    id, err := c.ParamsInt("id")
    todo := &Todo{}
    if err := c.BodyParser(todo); err != nul {
        return err
    }
    todo.ID = len(todos) + 1
    todos = append(todos, *todo)

    return c.JSON(todos)
}
func addTodoHandler(c *fiber.Ctx) error  {
    
}

func updateTodoHandler(c *fiber.Ctx) error  {
    
}
func deleteTodoHandler(c *fiber.Ctx) error  {
    
}

func main()  {
    app := fiber.New()

    app.Get('/health', healthCheck)

    app.Post('/api/login', loginHandler)
    app.Post('/api/register', registerHandler)
    app.Delete('/api/logout', loginHandler)
    app.Get('/api/todos/', getTodoHandler)
    app.Post('/api/todos/add', addTodoHandler)
    app.Patch('/api/todos/update/status', updateTodoHandler)
    app.Delete('/api/todos/delete', deleteTodoHandler)



    log.Fatal(app.Listen(":4000"))
}
