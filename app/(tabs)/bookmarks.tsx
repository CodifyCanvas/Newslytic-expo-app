import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';

const Bookmarks = () => {
  const [value, setValue] = React.useState('');
  const onChangeText = (text: string) => {
    setValue(text);
  };
  return (
    <ScrollView className='flex-1 px-5 p-2 bg-light'>
      <View>
        <View className='flex flex-row items-center justify-between rounded-full bg-icon-light px-4 mb-4'>
  <TextInput
    placeholder='Search Category'
    value={value}
    onChangeText={onChangeText}
    placeholderTextColor="#737373"
    className='text-neutral-700 text-xl flex-1 mr-2'
    style={{
      paddingVertical: 10, // vertical centering
    }}
  />

  {/* Feather Icon - positioned inline, vertically centered */}
  {value !== '' && (
            <TouchableOpacity onPress={() => setValue('')}>
              <Feather name="x-circle" size={17} color="gray" />
            </TouchableOpacity>
          )}
</View>


      </View>
    </ScrollView>
  )
}

export default Bookmarks;