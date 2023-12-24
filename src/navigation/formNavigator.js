import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FormProvider } from '../contexts/formContext';
import QuestionOne from '../screens/form/questionOne';
import QuestionTwo from '../screens/form/questionTwo';
import QuestionThree from '../screens/form/questionThree';
import QuestionFour from '../screens/form/questionFour';
import QuestionFive from '../screens/form/questionFive';
import QuestionSix  from '../screens/form/questionSix'
import FinishScreen from '../screens/form/questionFinish';
import FormStartScreen from '../screens/form/questionStart';

const FormStack = createStackNavigator();

const FormNavigator = () => (
    <FormProvider>
        <FormStack.Navigator     
            screenOptions={{ headerShown: false }}>
            <FormStack.Screen name="QuestionStart" component={FormStartScreen} />
            <FormStack.Screen name="QuestionOne" component={QuestionOne} />
            <FormStack.Screen name="QuestionTwo" component={QuestionTwo} />
            <FormStack.Screen name="QuestionThree" component={QuestionThree} />
            <FormStack.Screen name="QuestionFour" component={QuestionFour} />
            <FormStack.Screen name="QuestionFive" component={QuestionFive} />
            <FormStack.Screen name="QuestionSix" component={QuestionSix} />
            <FormStack.Screen name="QuestionFinish" component={FinishScreen} />
        </FormStack.Navigator>
    </FormProvider>
);

export default FormNavigator;
