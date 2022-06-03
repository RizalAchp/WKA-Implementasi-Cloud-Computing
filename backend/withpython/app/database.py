import os
import sqlite3
from sqlite3.dbapi2 import Cursor
from types import TracebackType
from typing import Any, Optional, Type
from model import (
    ModelTodo, ModelUser, PayloadTodo, PayloadUser, BaseModel, Settings
)


def strcmp(s1: str, s2: str):
    return s1.lower() == s2.lower()


class DataBase(Cursor):
    _instance = None

    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(con, *args, **kwargs)

    def get_users(self) -> PayloadUser:
        usrs = self.execute(
            'SELECT user_id, name, password, created, last_login FROM users'
        ).fetchall()
        p: PayloadUser = PayloadUser(users=[])
        for usr in usrs:
            _model = ModelUser(
                user_id=usr[0],
                name=usr[1],
                password=usr[2],
                created=usr[3],
            )
            p.users.append(_model)
        return p

    def add_user(self, user: ModelUser):
        stt = self.execute(
            "INSERT INTO "
            "users (name, password) "
            "values (?, ?)",
            (user.name, user.password)
        )
        self.commit_db()
        return True if stt else False

    def get_user(self, user: ModelUser):
        usr = self.execute(
            "SELECT user_id, name, password, created, last_login "
            "FROM users WHERE name= ? AND password= ?",
            (user.name, user.password)
        ).fetchone()
        return ModelUser(
            user_id=usr["user_id"],
            name=usr["name"],
            password=usr["password"],
            created=usr["created"],
        ) if usr else None

    def is_user_exist(self, user: ModelUser):
        usr = self.execute(
            "SELECT * FROM users "
            "WHERE user_id = ? AND name = ?",
            (user.user_id, user.name)
        ).fetchone()
        if any(usr):
            return ModelUser(**usr)
        return None

    def delete_user(self, user: ModelUser):
        self.execute(
            "DELETE FROM users WHERE name=? AND password=?", (
                user.name, user.password)
        )
        self.commit_db()
        return self.get_users()

    def get_all_todos(self):
        out: list[ModelTodo] = []
        todos = self.execute("SELECT * FROM todos ").fetchall()
        for t in todos:
            todos = ModelTodo(
                todo_id=t["todo_id"],
                list_id=t["list_id"],
                title=t["title"],
                body=t["body"],
                done=t["done"],
                tipe=t["tipe"],
                time=t["time"]
            )

            out.append(todos)
        return PayloadTodo(todos=out)

    def is_todos_exist(self, todo: ModelTodo):
        isexist = self.execute(
            "SELECT EXISTS(SELECT * FROM users "
            "WHERE todo_id=? AND user_id=?)",
            (todo.todo_id, todo.list_id)
        ).fetchone()
        return isexist[0][0]

    def get_todos(self, user_id: int):
        out: list[ModelTodo] = []
        todos = self.execute(
            "SELECT * FROM todos WHERE list_id = ?", (user_id,)
        ).fetchall()
        for t in todos:
            model = ModelTodo(
                todo_id=t[0],
                list_id=t[1],
                title=t[2],
                body=t[3],
                done=t[4],
                tipe=t[5],
                time=t[6]
            )
            out.append(model)

        return PayloadTodo(todos=out)

    def add_todos(self, todo: ModelTodo):
        self.execute(
            "INSERT INTO "
            "todos(list_id, title, body, done, tipe) "
            "values (?, ?, ?, ?, ?)",
            (todo.list_id, todo.title, todo.body, todo.done, todo.tipe)
        )
        self.commit_db()
        return self.get_todos(todo.list_id)

    def update_todos_status(self, sts, todo_id, list_id):
        self.execute("UPDATE todos SET done = ? "
                     "WHERE todo_id = ? AND list_id = ?",
                     (sts, todo_id, list_id))
        self.commit_db()
        return self.get_todos(list_id)

    def update_todos_row(self, todo: ModelTodo):
        self.execute("UPDATE todos "
                     "SET done = ?, todo_id = ?, list_id = ?, "
                     "title = ?, body = ?, done = ?, tipe = ?, time = ?"
                     "WHERE todo_id = ? AND list_id = ?",
                     (todo.done, todo.todo_id, todo.list_id,
                      todo.title, todo.body, todo.done,
                      todo.tipe, todo.time, todo.todo_id,
                      todo.list_id))
        self.commit_db()
        return self.get_todos(todo.list_id)

    def delete_todo(self, todo_id, user_id):
        self.execute(
            "DELETE FROM todos WHERE todo_id = ? AND list_id = ?",
            (todo_id, user_id)
        )
        self.commit_db()
        return self.get_todos(user_id)

    @staticmethod
    def delete_table():
        os.remove(DB)
        return None

    @staticmethod
    def create_table():
        con = sqlite3.connect(
            DB, detect_types=sqlite3.PARSE_DECLTYPES | sqlite3.PARSE_COLNAMES)
        con.row_factory = sqlite3.Row
        if os.stat(DB).st_size == 0:
            with open(SCRIPT) as f:
                con.executescript(f.read())
            con.commit()

    @staticmethod
    def commit_db():
        return con.commit()

    def __enter__(self) -> "DataBase":
        return self

    def __exit__(
        self,
        exc_type: Optional[Type[BaseException]],
        exc_val: Optional[BaseException],
        exc_tb: Optional[TracebackType],
    ) -> None:
        self.close()

    def __new__(cls, *args, **kwargs):
        if not isinstance(cls._instance, cls):
            cls._instance = object.__new__(cls)

        return cls._instance


ID = 0
NAME = 1
PSWD = 2
CREATED = 3
LASTLGN = 4

SCRIPT = os.path.abspath("data/datascript.sql")
DB = os.path.abspath("data/data.db")

con = sqlite3.connect(
    DB, detect_types=sqlite3.PARSE_DECLTYPES | sqlite3.PARSE_COLNAMES)
con.row_factory = sqlite3.Row
if os.stat(DB).st_size == 0:
    with open(SCRIPT) as f:
        con.executescript(f.read())

logined: list[ModelUser] = []
if __name__ == "__main__":
    print("W")
