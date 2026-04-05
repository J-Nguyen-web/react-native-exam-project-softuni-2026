import * as Location from 'expo-location'

export const getCurrentLocation = async () => {

        const { status, canAskAgain } =  await Location.requestForegroundPermissionsAsync();

        console.log("Status: ", status)
        console.log("CAN ASK AGAIN: ", canAskAgain)

        if (status !== 'granted') {
           return {
            success: false,
            status,
            canAskAgain
           }
        }

        const loc = await Location.getCurrentPositionAsync({});

        const { latitude, longitude } = loc.coords;


        const address = await Location.reverseGeocodeAsync({ latitude, longitude });
        console.log('ADRESSS:   ', address)

        let formatted = '';
        let country = '';
        let isoCode = '';

        if (address.length > 0){
            const place = address[0];
            const parts = []

            if (place.city)parts.push(`City: ${place.city}`);
            if (place.street)parts.push(`Street: ${place.name}`);
            if (place.region)parts.push(`Region: ${place.region}`);

            if (place.country) country = place.country;
            if (place.isoCode) isoCode = place.isoCode;

            formatted = parts.join('\n');
            
        }

    return {
        success: true,
        latitude,
        longitude,
        address: formatted,
        country,
        isoCode,
    }
}