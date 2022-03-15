import {
  Box,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  List,
} from '@mui/material'
import type { GetServerSideProps, NextPage } from 'next'
import { gql } from 'urql'
import { PostIndexPageDocument } from '../src/graphql/generated.graphql'
import { urqlClient } from '../src/libs/gql-requests'
import styles from '../styles/Home.module.css'

type Props = {
  posts: {
    id: string
    title: string
  }[]
}

const Home: NextPage<Props> = (props) => {
  return (
    <Stack
      sx={{
        minHeight: '100vh',
      }}
    >
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {props.posts.map((post) => (
          <ListItem key={post.id}>
            <ListItemAvatar>
              <Avatar>絵</Avatar>
            </ListItemAvatar>
            <ListItemText primary={post.title} secondary="公開日" />
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          bgColor: 'palette.primary.dark',
          backgroundColor: (theme) => theme.palette.primary.dark,
          color: (theme) =>
            theme.palette.getContrastText(theme.palette.primary.dark),
          py: 3,
          textAlign: 'center',
          marginTop: 'auto',
        }}
      >
        <footer>
          <a
            href="http://devcon.hakoika.jp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by pon0204
          </a>
        </footer>
      </Box>
    </Stack>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const client = await urqlClient()

    const result = await client.query(PostIndexPageDocument, {}).toPromise()
    return {
      props: {
        posts: result.data.posts,
      },
    }
  } catch (e) {
    console.error(e)
    return {
      notFound: true,
    }
  }
}

export default Home
