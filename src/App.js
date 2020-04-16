import React, { useEffect, useState } from "react";

import api from './services/api';

import Icon from 'react-native-vector-icons/MaterialIcons'

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {

  const [repositories, setRepositories] = useState([]);
  const [techs, setTechs] = useState(['JAVA', 'PYTON', 'NODE']);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })

  }, [])

  async function handleLikeRepository(id) {

    const response = await api.post(`repositories/${id}/like`);

    setRepositories(repositories.map(repo => {
      if (repo.id === id) {
        return repo = response.data
      }
      return repo
    }))
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>

        <FlatList
          style={styles.list}
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({ item: repository }) => (

            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}> {repository.title} </Text>

              <View style={styles.techsContainer}>
                {
                  (repository.techs).map(tech => (
                    <Text key={tech} style={styles.tech}>
                      {tech}
                    </Text>
                  ))
                }
              </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${repository.id}`}
                >
                  {repository.likes} curtidas
            </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}
                testID={`like-button-${repository.id}`}
              >
                <Text style={styles.buttonText}>
                  Curtir
                  </Text>
                <Icon style={styles.icon} name="thumb-up" color="#eee" size={25} />
              </TouchableOpacity>
            </View>

          )}

        />

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
    color: '#222'
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
    flex: 1,
    flexWrap: "wrap"
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: "#04d361",
    paddingHorizontal: 5,
    paddingVertical: 5,
    color: "#fff",
    borderRadius: 5
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 120,
    borderRadius: 15,
    backgroundColor: "#7159c1",
  },

  icon: {
    marginLeft: -7
  },

  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 0,
    color: "#fff",
    padding: 15,
  },

  list: {
    paddingTop: 15
  }
});
