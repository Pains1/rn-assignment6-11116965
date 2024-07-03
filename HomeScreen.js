import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const products = [
  { id: '1', name: 'Office Wear', price: 120, image: require('./assets/dress1.png') },
  { id: '2', name: 'Black', price: 120, image: require('./assets/dress2.png') },
  { id: '3', name: 'Church Wear', price: 120, image: require('./assets/dress3.png') },
  { id: '4', name: 'Lamerei', price: 120, image: require('./assets/dress4.png') },
  { id: '5', name: '21WN', price: 120, image: require('./assets/dress5.png') },
  { id: '6', name: 'Lopo', price: 120, image: require('./assets/dress6.png') },
  { id: '7', name: '21WN', price: 120, image: require('./assets/dress7.png') },
  { id: '8', name: 'lame', price: 120, image: require('./assets/dress3.png') },
];

const HomeScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart !== null) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const addToCart = async (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OUR Story</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate('Cart')}
      >
        <Text style={styles.cartButtonText}>View Cart ({cart.length})</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  productItem: {
    flex: 1,
    margin: 5,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
  },
  productName: {
    marginTop: 5,
    fontSize: 16,
  },
  productPrice: {
    marginTop: 5,
    fontSize: 14,
    color: '#888',
  },
  addButton: {
    marginTop: 5,
    backgroundColor: '#007bff',
    padding: 5,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
  },
  cartButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  cartButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default HomeScreen;