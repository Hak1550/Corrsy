import { parse } from "react-native-svg"

const config = {
    screens: {
        SharePost: {
            path: 'share_post/:id',
            parse: { id: id => `${id}` }
        },
        DirectMessage: {
            path: 'chat/dm',
            parse: {
                id: (id) => `${id}`
            }
        },
        SignInUp: {
            path: 'signup',
        }
    }
}

const linking = {
    prefixes: ['app://cannalife'],
    config
}

export default linking