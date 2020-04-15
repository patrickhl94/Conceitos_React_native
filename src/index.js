import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList } from 'react-native'

import api from './services/api';

export default function App() {

  const [projects, setProjects] = useState([])

  useEffect(() => {

    api.get('repositories').then(response => {
      setProjects(response.data);
    })

  }, [])

  return (
    <>
      <StatusBar backgroundColor='#7159c1' barStyle='light-content' />
      <FlatList
        style={styles.container}
        data={projects}
        keyExtractor={project => project.id}
        renderItem={({ item: project }) => (
          <Text style={styles.text} >
            {project.title}
          </Text>
        )}
      />
    </>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },

  text: {
    color: '#fff',
    fontSize: 20,
  }

})