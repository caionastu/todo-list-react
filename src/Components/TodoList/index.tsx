import { Delete } from '@mui/icons-material'
import {
  Container,
  List,
  ListItem,
  IconButton,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText
} from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'

export interface Todo {
  id: number
  description: string
  done: boolean
}

interface Props {
  todos: Todo[]
  onRemove: (todo: Todo) => void
  onToggle: (todo: Todo) => void
}

const TodoList: React.FC<Props> = ({ todos, onRemove, onToggle }) => {
  const listAnimation = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.15
      }
    }
  }

  const listItemAnimation = {
    hidden: {
      opacity: 0,
      x: -200
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
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
        component={motion.div}
        variants={listAnimation}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              component={motion.div}
              variants={listItemAnimation}
              exit={{
                opacity: 0,
                scale: 0,
                transition: {
                  duration: 0.3
                }
              }}
              divider
              disablePadding
              secondaryAction={
                <IconButton onClick={() => onRemove(todo)} edge="start">
                  <Delete sx={{ color: '#df2935' }} />
                </IconButton>
              }
              sx={{
                textDecoration: todo.done ? 'line-through' : 'none',
                fontStyle: todo.done ? 'italic' : 'normal',
                color: todo.done ? 'gray' : 'black'
              }}
            >
              <ListItemButton disableGutters onClick={() => onToggle(todo)}>
                <ListItemIcon>
                  <Checkbox edge="start" disableRipple checked={todo.done} />
                </ListItemIcon>
                <ListItemText primary={todo.description} />
              </ListItemButton>
            </ListItem>
          ))}
        </AnimatePresence>
      </List>
    </Container>
  )
}

export default TodoList
