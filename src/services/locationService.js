import * as Location from 'expo-location'

export const getCurrentLocation = async () => {

        const serviceEnabled = await Location.hasServicesEnabledAsync();

        if(!serviceEnabled) {
            return {
                success: false,
                reason: 'serviceOff'
            }
        }

        const { status, canAskAgain } =  await Location.requestForegroundPermissionsAsync();

        console.log("Status: ", status)
        console.log("CAN ASK AGAIN: ", canAskAgain)

        if (status !== 'granted') {
           return {
            success: false,
            reason: "permissionDenied",
            status,
            canAskAgain
           }
        }

        const loc = await Location.getCurrentPositionAsync({});

        const { latitude, longitude } = loc.coords;


        const address = await Location.reverseGeocodeAsync({ latitude, longitude });
        // console.log('ADRESSS:   ', address,'[0]', address[0])

        let formatted = '';
        let country = '';
        let city = '';
        let street = '';
        let region = '';
        let isoCode = '';

        if (address.length > 0){
            const place = address[0];
            const parts = []

            if (place.city)parts.push(`City: ${place.city}`);
            if (place.street)parts.push(`Street: ${place.street}`);
            if (place.region)parts.push(`Region: ${place.region}`);

            if (place.country) country = place.country;
            if (place.city) city = place.city;
            if (place.street) street = place.street;
            if (place.region) region = place.region;
            if (place.isoCountryCode) isoCode = place.isoCountryCode;

            formatted = parts.join('\n');
            
        }

    return {
        success: true,
        latitude,
        longitude,
        address: formatted,
        country,
        city,
        street,
        region,
        isoCode,
    }
}