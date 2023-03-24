export interface InitialState {
  loading: boolean;
  data?: {
    _id: string;
    user: string;
    todoList: [{ task: string; done: boolean; _id: string }];
  };
  error?: any;
}

export interface ITodoList {
  task: string;
  done: boolean;
  _id: string;
}

export interface InitialUserState {
  loading: boolean;
  user?: any;
  error?: any;
}

// export  {InitialState, InitialUserState};
