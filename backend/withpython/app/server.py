from functools import lru_cache
from fastapi import FastAPI, Path, HTTPException, status
from fastapi.param_functions import Depends
from passlib.context import CryptContext
from database import DataBase, logined, ModelTodo, ModelUser, Settings
from datetime import datetime, timedelta

from jose import JWTError, jwt

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

api = FastAPI()


@lru_cache()
def get_settings():
    return Settings()


def create_access_token(data: dict, stg: Settings):
    to_encode = data.copy()
    expiretoken = timedelta(stg.expire_token_minute)
    if expiretoken:
        expire = datetime.utcnow() + expiretoken
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    try:
        return jwt.encode(
            to_encode, stg.secret_key, algorithm=stg.algorithm
        )
    except JWTError:
        return jwt.encode(
            to_encode, stg.secret_key, algorithm=stg.algorithm
        )


def check_login(user_id: int):
    for i in logined:
        if i.user_id != user_id:
            continue
        return logined.index(i)
    return None


@api.get("/info")
async def info(
    stg: Settings = Depends(get_settings)
):
    api.debug = bool(stg.debug)
    return {
        "app_name": stg.app_name,
        "admin_name": stg.admin_name,
        "todo_per_user": stg.items_per_user
    }


@api.get("/api/token/{user_id}")
async def checktoken(
    user_id: int
):
    idx = check_login(user_id)
    if idx is None:
        return {"status": False}
    return {"status": True, "token": logined[idx]}


@api.get("/api/login")
async def loginuser(
    user: ModelUser,
    stg: Settings = Depends(get_settings)
):
    with DataBase() as db:
        usr = db.is_user_exist(user)
        if usr is not None:
            token = create_access_token({"sub": usr.name}, stg)
            usr.token = token
            logined.append(usr)
            usr.islogin = True
            return {
                "status": True,
                "message": "Login in.",
                "user": usr
            }
        return {
            "status": False,
            "message": "incorrect email and password"
        }


@api.post("/api/register")
async def addloginuser(
    user: ModelUser,
    stg: Settings = Depends(get_settings)
):
    with DataBase() as db:
        registered = db.is_user_exist(user)
        if registered is None:
            db.add_user(user)
            usr = db.get_user(user)
            if usr is not None:
                token = create_access_token({"sub": usr.name}, stg)
                usr.token = token
                logined.append(usr)
                usr.islogin = True
                return {"status": True, "message": "registered", "user": usr}
        return {
            "status": False,
            "message": f"User :{user.name} is already registered",
            "user": registered
        }


@api.get("/api/logout/{id_user}")
async def logoutuser(
    id_user: int
):
    loc = check_login(id_user)
    if loc is not None:
        user = logined.pop(loc)
        return {
            "status": "OK",
            "message": "Login out",
            "user": user
        }


@api.get("/api/todos/{user_id}")
async def todos(
    user_id: int
):
    with DataBase() as db:
        payload = db.get_todos(user_id)
    if payload.todos:
        return {
            "status": True,
            "message": "todos",
            "payload": payload.todos
        }
    return {
        "status": False,
        "message": "todo kosong"
    }


@api.post("/api/todos/add/")
async def addtodo(
    todo: ModelTodo,
):
    with DataBase() as db:
        return db.add_todos(todo)


@api.patch("/api/todos/update")
async def updateodo(
    todo: ModelTodo
):
    with DataBase() as db:
        if db.is_todos_exist(todo):
            payload = db.update_todos_row(todo)
            return payload

    return {
        "status": False,
        "message": "Todo is not exists"
    }


@api.patch("/api/todos/update/status")
async def updatetodostatus(
    sts: bool | None = None,
    todo_id: int | None = None,
    user_id: int | None = None,
):
    if sts is None and todo_id is None and user_id is None:
        return {"status": "ERROR", "message": "Query Parameter is Empty"}
    with DataBase() as db:
        payload = db.update_todos_status(sts, todo_id, user_id)
    return payload


@api.delete("/api/todos/delete")
async def deletetodos(
    id_todo: int | None = None,
    id_user: int | None = None,
):
    if id_todo is None and id_user is None:
        return {"status": "ERROR", "message": "Query Parameter is Empty"}
    with DataBase() as db:
        payload = db.delete_todo(id_todo, id_user)
        return payload
