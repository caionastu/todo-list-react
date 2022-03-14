import { Add, PlusOne } from '@mui/icons-material'
import { Box, Button, Container, TextField } from '@mui/material'
import { motion } from 'framer-motion'
import React, { useRef, useState } from 'react'
import TodoList, { Todo } from '../TodoList'

const Page: React.FC = () => {
  const [text, setText] = useState<string>('')
  const textFieldRef = useRef<HTMLInputElement>(null)

  const initialTodos: Todo[] = []
  for (let i = 0; i < 11; i++) {
    initialTodos.push({
      id: i + 1,
      description: `Item ${i + 1}`,
      done: i % 2 === 0
    })
  }
  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  const addNew = () => {
    if (text.trim() !== '') {
      const newTodo: Todo = {
        id: todos.length + 1,
        description: text,
        done: false
      }
      setTodos([...todos, newTodo])
    }

    setText('')
    if (textFieldRef.current) {
      textFieldRef.current.focus()
    }
  }

  const handleToggle = (todo: Todo) => {
    todo.done = !todo.done
    setTodos([...todos])
  }

  const remove = (todo: Todo) => {
    const newList = todos.filter((element) => element.id !== todo.id)
    setTodos([...newList])
  }

  const onKeyPress = (key: String) => {
    if (key === 'Enter') {
      addNew()
    }
  }

  return (
    <Box
      sx={{
        height: '100vh',
        textAlign: 'center',
        pt: 10,
        bgcolor: '#f8f7ff'
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Container
          sx={{
            display: { xs: 'flex', sm: 'block' },
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-around'
          }}
        >
          <TextField
            autoFocus
            placeholder="Insert a TODO here!!!"
            size="small"
            inputProps={{ maxLength: 40 }}
            sx={{
              width: { xs: '100%', sm: '80%' },
              maxWidth: { xs: 500, sm: 650 },
              minWidth: 300,
              margin: { xs: '0 0 10px 0', sm: '0 10px 0 0' }
            }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            inputRef={textFieldRef}
            onKeyPress={(e) => onKeyPress(e.key)}
          ></TextField>
          <Button
            startIcon={<Add></Add>}
            size="medium"
            variant="contained"
            sx={{
              maxWidth: { xs: 500, sm: 100 },
              width: { xs: '100%', sm: '-1' }
            }}
            onClick={() => addNew()}
            disabled={text === ''}
          >
            Add
          </Button>
        </Container>

        <TodoList
          todos={todos}
          onToggle={(todo) => handleToggle(todo)}
          onRemove={(todo) => remove(todo)}
        ></TodoList>
      </motion.div>
    </Box>
  )
}

export default Page
