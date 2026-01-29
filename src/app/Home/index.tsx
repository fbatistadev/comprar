import { useState, useEffect } from 'react'
import { View, Image, TouchableOpacity, Text, FlatList, Alert } from 'react-native'

import { Input } from '@/components/Input'
import { Item } from '@/components/Item'
import { Filter } from '@/components/Filter'
import { Button } from '@/components/Button'

import { styles } from "./styles"
import { FilterStatus } from '@/types/FilterStatus'
import { itemsStorage, ItemStorage } from '@/storage/items/itemsStorage'

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)
  const [description, setDescription] = useState("")
  const [items, setItems] = useState<ItemStorage[]>([])

  async function handleAdd() {
    if (!description.trim()) {
      return Alert.alert("Adicionar", "Informe a descrição para adicionar")
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING,
    }

    await itemsStorage.add(newItem)
    await getItems()
  }

  async function getItems() {
    try {
      const response = await itemsStorage.get()
      setItems(response)
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível carregar os itens.")
    }
  }

  useEffect(() => {
    getItems()
  }, [filter])

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style=
        {styles.logo} />

      <View style={styles.form}>
        <Input 
          placeholder="O que você precisa comprar?" 
          onChangeText={setDescription}
        />

        <Button title="Adicionar" onPress={handleAdd} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status === filter}
              onPress={() => setFilter(status)}
            />
          ))}

          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onStatus={() => console.log("Status changed")}
              onRemove={() => console.log("Item removed")}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>Nenhum item aqui</Text>
          )}
        />
      </View>
    </View>
  )
}
