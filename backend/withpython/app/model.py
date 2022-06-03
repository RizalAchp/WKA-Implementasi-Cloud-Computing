from pydantic import BaseModel, BaseSettings, ConstrainedList
from typing import Literal, Union, Optional
from datetime import datetime

Tanggal = Union[str, datetime]

LiteralType = Literal["kerja", "kuliah",
                      "belajar", "program", "istirahat", "etc"]
TodosType = Union[LiteralType, str]


class Settings(BaseSettings):
    debug: int = 0
    app_name: str | None = None
    admin_name: str | None = None
    admin_pass: str | None = None
    items_per_user: int | None = None
    secret_key: str | None = None
    algorithm: str = "HS256"
    expire_token_minute: int = 30

    class Config:
        env_file = ".env"


class ModelTodo(BaseModel):
    """ModelTodo.
    `todo_id:   int`                            => id todo
    `list_id:   int`                            => id list todo manytoone by user_id
    `title:     string`                         => judul/nama todo
    `body:      string`                         => deskripsi todo
    `done:      Union[bool]`                    => status todo [sudah / belum]
    `tipe:      Union[TypeLiteral[TodoType]]`   => tipe todo
    `time:      Union[Tanggal, datetime]`       => waktu todo dilaksakan
    """

    todo_id: Optional[int] = None
    list_id: int
    title: str
    body: str

    done: bool = False
    tipe: TodosType = "etc"
    time: Optional[Tanggal] = None


class ModelUser(BaseModel):
    """ModelUser.
    `user_id:       int`                => id untuk user
    `name:          string`             => nama untuk user
    `password:      string`             => password untuk user
    `last_login:    TypeAlias[Tanggal]` => waktu login terakhir user
    """

    user_id: int | None = None
    name: str
    password: str
    created: Tanggal | datetime | None = None
    islogin: bool = False
    token: str | None = None


class PayloadUser(BaseModel):
    users: list[ModelUser]


class PayloadTodo(BaseModel):
    todos: list[ModelTodo]


if __name__ == "__main__":
    # user = ModelUser(user_id=1, name="Rizal Achmamd",
    #                  password="Muhammad", created="today", last_login="today too")
    # data = tuple(d for i, d in user.__iter__())
    # print(data)
    user = {"user_id": 1, "name": "Rizal Achmad", "password": "passwordss",
            "created": "dontknow", "last_login": "whatever"}
    usermodel = ModelUser(**user)
    print(usermodel)
    # print(f'{user=}')
    # print(f'{tuple(user)=}')
    # print(f'{set(user)=}')
