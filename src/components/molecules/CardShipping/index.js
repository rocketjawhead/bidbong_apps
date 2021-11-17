import {React, View} from 'libraries';
import {Text} from 'components/atoms';
import styles from './styles';

const CardShipping = ({}) => {
  const data = '';
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.square}>
          <Text translate={false} style={styles.text.nume}>
            2
          </Text>
        </View>
        <Text>trxDetail.text.shipping</Text>
      </View>
      <View>
        <Text style={styles.text.form}>trxDetail.text.firstname</Text>
        <Text translate={false} style={styles.text.formValue}>
          Alfan hibban
        </Text>
        <Text style={styles.text.form}>trxDetail.text.lastname</Text>
        <Text translate={false} style={styles.text.formValue}>
          Intiyas
        </Text>
        <Text style={styles.text.form}>trxDetail.text.email</Text>
        <Text translate={false} style={styles.text.formValue}>
          Alfan@gmail.com
        </Text>
        <Text style={styles.text.form}>trxDetail.text.phonenumber</Text>
        <Text translate={false} style={styles.text.formValue}>
          081 335 671 179
        </Text>
        <Text style={styles.text.form}>trxDetail.text.address</Text>
        <Text translate={false} style={styles.text.formValue}>
          Sawojajar
        </Text>
        <Text style={styles.text.form}>trxDetail.text.city</Text>
        <Text translate={false} style={styles.text.formValue}>
          Malang
        </Text>
        <Text style={styles.text.form}>trxDetail.text.state</Text>
        <Text translate={false} style={styles.text.formValue}>
          Jawa timur
        </Text>
        <Text style={styles.text.form}>trxDetail.text.zipcode</Text>
        <Text translate={false} style={styles.text.formValue}>
          65159
        </Text>
        <Text style={styles.text.form}>trxDetail.text.country</Text>
        <Text translate={false} style={styles.text.formValue}>
          Indonesia
        </Text>
      </View>
    </View>
  );
};

export default React.memo(CardShipping);
