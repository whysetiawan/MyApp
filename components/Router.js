import {StackNavigator} from 'react-navigation';
import Index from '../src/Index';
import Register from '../src/Register';
import Menu from '../src/home_screen/Menu';
import Detail from '../src/home_screen/Detail';
import Checkout from '../src/home_screen/Checkout';
import Payment from '../src/home_screen/Payment';
import Add from '../src/home_screen/Add Product';


export const Stack = StackNavigator({
	Index: { screen:Index },
	Register: { screen:Register },
	Menu: { screen:Menu },
	Detail: { screen:Detail },
	Checkout: { screen:Checkout },
	Payment: { screen:Payment },
	Add: { screen:Add },
})
