import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView } from 'react-native'
import axios from 'axios'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'

const IntegrateApi = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products')
                setProducts(response.data)
            } catch (error) {
                console.error('Error fetching products:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
            <View style={styles.footer}>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                <Text style={styles.category}>{item.category}</Text>
            </View>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>🛍 Product List</Text>
            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator animating={true} color={MD2Colors.deepPurple500} size="large" />
                    <Text style={styles.loadingText}>Loading Products...</Text>
                </View>
            ) : (
                <FlatList
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
        paddingTop: 20,
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#1f2937',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#6b7280',
    },
    list: {
        paddingHorizontal: 14,
        paddingBottom: 30,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    image: {
        height: 160,
        width: '100%',
        resizeMode: 'contain',
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 6,
    },
    description: {
        fontSize: 14,
        color: '#4b5563',
        marginBottom: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#10b981',
    },
    category: {
        fontSize: 12,
        backgroundColor: '#e0f2fe',
        color: '#0369a1',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        overflow: 'hidden',
    },
})

export default IntegrateApi
