import { useState } from 'react'
import { View, Image, TouchableOpacity, Text, FlatList } from 'react-native'

import { Input } from '@/components/Input'
import { Item } from '@/components/Item'
import { Filter } from '@/components/Filter'
import { Button } from '@/components/Button'

import { styles } from "./styles"
import { FilterStatus } from '@/types/FilterStatus'

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]
const ITEMS = [
  { id: '1', status: FilterStatus.DONE, description: 'Leite'},
  { id: '2', status: FilterStatus.PENDING, description: 'Ovos'},
  { id: '3', status: FilterStatus.PENDING, description: 'Pão'},
  { id: '4', status: FilterStatus.DONE, description: 'Manteiga'},
]

export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING)

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style=
        {styles.logo} />

      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar?" />
        <Button title="Adicionar" />
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
            data={ITEMS}
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
