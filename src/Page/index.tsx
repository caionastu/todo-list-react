import { Box, Button, Checkbox, Container, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material'
import { Delete } from '@mui/icons-material'
import React, { useRef, useState } from 'react'

interface Todo {
  id: string,
  description: string,
  done: boolean
}

const Page: React.FC = () => {
  const [text, setText] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: '1',
      description: 'Item 1',
      done: false
    },
    {
      id: '2',
      description: 'Item 2',
      done: false
    },
    {
      id: '3',
      description: 'Item 3',
      done: true
    }
  ])

  const textFieldRef = useRef<HTMLInputElement>(null)

  const handleToggle = (todo: Todo) => {
    todo.done = !todo.done
    setTodos([...todos])
  }

  const addNew = () => {
    if (text.trim() !== '') {
      const newTodo: Todo = {
        id: '' + todos.length + 1,
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

  const remove = (todo: Todo) => {
    const newList = todos.filter(element => element.id !== todo.id)
    setTodos([...newList])
  }

  const onEnterPress = (key: String) => {
    if (key === 'Enter') {
      addNew()
    }
  }

  return (
    <Box sx={{
      height: '100vh',
      textAlign: 'center',
      pt: 10,
      bgcolor: 'lightGray'
    }}>
      <Container sx={{
        display: { xs: 'flex', sm: 'block' },
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'space-around'
      }}>
        <TextField
          autoFocus
          placeholder='Insert a TODO here!!!'
          size='small'
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
          onKeyPress={(e) => onEnterPress(e.key)}
        >
        </TextField>
        <Button
          size='medium'
          variant='contained'
          sx={{
            maxWidth: { xs: 500, sm: 100 },
            width: { xs: '100%', sm: '-1' }
          }}
          onClick={() => addNew()}
          disabled={text === ''}
        >
          Add new
        </Button>
      </Container>

      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          paddingTop: 2
        }}
      >

        <List
          sx={{
            width: { xs: '100%', sm: '95%' },
            maxWidth: { xs: 500, sm: 100 + 650 },
            maxHeight: 'calc(100vh - 120px - 30px)',
            overflow: 'auto',
            scrollbarWidth: '1px',
            p: 0
          }}
        >

          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              divider
              disablePadding
              secondaryAction={
                <IconButton
                  onClick={() => remove(todo)}
                  edge = 'start'
                >
                  <Delete
                    sx={{ color: '#DD4B4D' }}
                  />
                </IconButton>
              }
              sx={{
                textDecoration: todo.done ? 'line-through' : 'none',
                fontStyle: todo.done ? 'italic' : 'normal',
                color: todo.done ? 'gray' : 'black'
              }}
            >

                <ListItemButton
                  disableGutters
                  onClick={() => handleToggle(todo)}
                >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        disableRipple
                        checked={todo.done}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={todo.description}
                    />
                  </ListItemButton>

              </ListItem>
          ))}

        </List>
      </Container>
    </Box>
  )
}

export default Page
