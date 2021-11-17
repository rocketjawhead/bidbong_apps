import { React, View } from 'libraries';
import { Text } from 'components/atoms';
import styles from './styles';

const CardPayment = ({}) => {
  const data = '';
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.square}>
          <Text translate={false} style={styles.text.nume}>
            3
          </Text>
        </View>
        <Text>trxDetail.text.payment</Text>
      </View>
      <View>
        <Text style={styles.text.form}>trxDetail.text.paymentMethod</Text>
        <Text style={styles.text.formValue}>trxDetail.text.paymentType</Text>
      </View>
    </View>
  );
};

export default React.memo(CardPayment);
