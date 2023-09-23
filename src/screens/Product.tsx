import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';

import type {ProductScreenNavigationProp} from '../types/navigation';
import {horizontalScale, verticalScale, scaleFontSize} from '../util/scaling';
import {Colors} from '../constants/colors';
import Header from '../components/ui/Header';
import Input from '../components/ui/Input';

function Product(): JSX.Element {
  const ProductSchema = Yup.object().shape({
    name_en: Yup.string().required('Please enter above field'),
    name_jp: Yup.string().required('Please enter above field'),
    jan_code: Yup.string().required('Please enter above field'),
    category_1_main: Yup.string().required('Please enter above field'),
    category_1_sub: Yup.string().required('Please enter above field'),
    category_2_main: Yup.string().required('Please enter above field'),
    category_2_sub: Yup.string().required('Please enter above field'),
    intro_en: Yup.string().required('Please enter above field'),
    intro_jp: Yup.string().required('Please enter above field'),
    image_path_1: Yup.string().required('Please enter above field'),
    image_path_2: Yup.string().required('Please enter above field'),
    youtube_url: Yup.string().required('Please enter above field'),
    sale_for: Yup.string().required('Please enter above field'),
    specialty_diets: Yup.string().required('Please enter above field'),
    ingredients_en: Yup.string().required('Please enter above field'),
    ingredients_jp: Yup.string().required('Please enter above field'),
    allergens_en: Yup.string().required('Please enter above field'),
    allergens_jp: Yup.string().required('Please enter above field'),
    shelf_life: Yup.string().required('Please enter above field'),
    shelf_life_unit: Yup.string().required('Please enter above field'),
    storage_temperature: Yup.string().required('Please enter above field'),
    manufacture_location: Yup.string().required('Please enter above field'),
    width: Yup.string().required('Please enter above field'),
    depth: Yup.string().required('Please enter above field'),
    height: Yup.string().required('Please enter above field'),
    net_weight: Yup.string().required('Please enter above field'),
    net_weight_unit: Yup.string().required('Please enter above field'),
    weight: Yup.string().required('Please enter above field'),
    weight_unit: Yup.string().required('Please enter above field'),
    item_price: Yup.string().required('Please enter above field'),
    case_width: Yup.string().required('Please enter above field'),
    case_depth: Yup.string().required('Please enter above field'),
    case_height: Yup.string().required('Please enter above field'),
    total_weight: Yup.string().required('Please enter above field'),
    total_weight_unit: Yup.string().required('Please enter above field'),
    quantity_per_case: Yup.string().required('Please enter above field'),
    lead_time: Yup.string().required('Please enter above field'),
    lead_time_unit: Yup.string().required('Please enter above field'),
    minimum_order_quantity: Yup.string().required('Please enter above field'),
    oem_possibility: Yup.string().required('Please enter above field'),
    manufacturer_certification: Yup.string().required(
      'Please enter above field',
    ),
    product_certification: Yup.string().required('Please enter above field'),
    usa_importer: Yup.string().required('Please enter above field'),
    fda_id: Yup.string().required('Please enter above field'),
    duns_number: Yup.string().required('Please enter above field'),
    recipe: Yup.string().required('Please enter above field'),
    cooked: Yup.string().required('Please enter above field'),
    label_handling: Yup.string().required('Please enter above field'),
    import_experience: Yup.string().required('Please enter above field'),
    sent: Yup.string().required('Please enter above field'),
    user_id: Yup.string().required('Please enter above field'),
  });
  const navigation = useNavigation<ProductScreenNavigationProp>();

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Formik
            initialValues={{
              name_en: '',
              name_jp: '',
              jan_code: '',
              category_1_main: '',
              category_1_sub: '',
              category_2_main: '',
              category_2_sub: '',
              intro_en: '',
              intro_jp: '',
              image_path_1: '',
              image_path_2: '',
              youtube_url: '',
              sale_for: '',
              specialty_diets: '',
              ingredients_en: '',
              ingredients_jp: '',
              allergens_en: '',
              allergens_jp: '',
              shelf_life: '',
              shelf_life_unit: '',
              storage_temperature: '',
              manufacture_location: '',
              width: '',
              depth: '',
              height: '',
              net_weight: '',
              net_weight_unit: '',
              weight: '',
              weight_unit: '',
              item_price: '',
              case_width: '',
              case_depth: '',
              case_height: '',
              total_weight: '',
              total_weight_unit: '',
              quantity_per_case: '',
              lead_time: '',
              lead_time_unit: '',
              minimum_order_quantity: '',
              oem_possibility: '',
              manufacturer_certification: '',
              product_certification: '',
              usa_importer: '',
              fda_id: '',
              duns_number: '',
              recipe: '',
              cooked: '',
              label_handling: '',
              import_experience: '',
              sent: '',
              user_id: '',
            }}
            validationSchema={ProductSchema}
            onSubmit={() => {}}>
            {({
              values,
              touched,
              errors,
              setFieldTouched,
              handleChange,
              handleSubmit,
              isValid,
            }) => (
              <>
                <Header type={1}>Product Information</Header>
                <Text style={styles.instructions}>
                  Fields labeled (Japanese) are not forced. You may enter
                  English instead.
                </Text>
                <Input
                  value={values.name_en}
                  label={'Product Name'}
                  onBlur={() => setFieldTouched('name_en')}
                  onChangeText={handleChange('name_en')}
                />
                {touched.name_en && errors.name_en && (
                  <Text style={styles.errorText}>{errors.name_en}</Text>
                )}
                <Input
                  value={values.name_jp}
                  label={'Product Name (Japanese)'}
                  onBlur={() => setFieldTouched('name_jp')}
                  onChangeText={handleChange('name_jp')}
                />
                {touched.name_jp && errors.name_jp && (
                  <Text style={styles.errorText}>{errors.name_jp}</Text>
                )}
                <Input
                  value={values.jan_code}
                  label={'JAN Code'}
                  onBlur={() => setFieldTouched('jan_code')}
                  onChangeText={handleChange('jan_code')}
                />
                {touched.jan_code && errors.jan_code && (
                  <Text style={styles.errorText}>{errors.jan_code}</Text>
                )}
                {/* 
                category_1_main
                category_1_sub
                category_2_main
                category_2_sub
              */}
                <Input
                  value={values.intro_en}
                  label={'Introduction'}
                  multiline={true}
                  onBlur={() => setFieldTouched('intro_en')}
                  onChangeText={handleChange('intro_en')}
                />
                {touched.intro_en && errors.intro_en && (
                  <Text style={styles.errorText}>{errors.intro_en}</Text>
                )}
                <Input
                  value={values.intro_jp}
                  label={'Introduction (Japanese)'}
                  multiline={true}
                  onBlur={() => setFieldTouched('intro_jp')}
                  onChangeText={handleChange('intro_jp')}
                />
                {touched.intro_jp && errors.intro_jp && (
                  <Text style={styles.errorText}>{errors.intro_jp}</Text>
                )}
                {/* 
                image_path_1
                image_path_2
              */}
                <Input
                  value={values.jan_code}
                  label={'Introduction Video (YouTube URL)'}
                  onBlur={() => setFieldTouched('youtube_url')}
                  onChangeText={handleChange('youtube_url')}
                />
                {touched.youtube_url && errors.youtube_url && (
                  <Text style={styles.errorText}>{errors.youtube_url}</Text>
                )}
                {/* 
                sale_for
                specialty_diets
              */}
                <Input
                  value={values.ingredients_en}
                  label={'Ingredients'}
                  multiline={true}
                  onBlur={() => setFieldTouched('ingredients_en')}
                  onChangeText={handleChange('ingredients_en')}
                />
                {touched.ingredients_en && errors.ingredients_en && (
                  <Text style={styles.errorText}>{errors.ingredients_en}</Text>
                )}
                <Input
                  value={values.ingredients_jp}
                  label={'Ingredients (Japanese)'}
                  multiline={true}
                  onBlur={() => setFieldTouched('ingredients_jp')}
                  onChangeText={handleChange('ingredients_jp')}
                />
                {touched.ingredients_jp && errors.ingredients_jp && (
                  <Text style={styles.errorText}>{errors.ingredients_jp}</Text>
                )}
                <Input
                  value={values.allergens_en}
                  label={'Allergens'}
                  multiline={true}
                  onBlur={() => setFieldTouched('allergens_en')}
                  onChangeText={handleChange('allergens_en')}
                />
                {touched.allergens_en && errors.allergens_en && (
                  <Text style={styles.errorText}>{errors.allergens_en}</Text>
                )}
                <Input
                  value={values.ingredients_jp}
                  label={'Allergens (Japanese)'}
                  multiline={true}
                  onBlur={() => setFieldTouched('allergens_jp')}
                  onChangeText={handleChange('allergens_jp')}
                />
                {touched.allergens_jp && errors.allergens_jp && (
                  <Text style={styles.errorText}>{errors.allergens_jp}</Text>
                )}
                <Input
                  value={values.shelf_life}
                  label={'Shelf Life'}
                  onBlur={() => setFieldTouched('shelf_life')}
                  onChangeText={handleChange('shelf_life')}
                />
                {touched.shelf_life && errors.shelf_life && (
                  <Text style={styles.errorText}>{errors.shelf_life}</Text>
                )}
                {/* 
                shelf_life_unit
                storage_temperature
                manufacture_location
              */}
                <Input
                  value={values.width}
                  label={'Width'}
                  onBlur={() => setFieldTouched('width')}
                  onChangeText={handleChange('width')}
                />
                {touched.width && errors.width && (
                  <Text style={styles.errorText}>{errors.width}</Text>
                )}
                <Input
                  value={values.depth}
                  label={'Depth'}
                  onBlur={() => setFieldTouched('depth')}
                  onChangeText={handleChange('depth')}
                />
                {touched.depth && errors.depth && (
                  <Text style={styles.errorText}>{errors.depth}</Text>
                )}
                <Input
                  value={values.height}
                  label={'Height'}
                  onBlur={() => setFieldTouched('height')}
                  onChangeText={handleChange('height')}
                />
                {touched.height && errors.height && (
                  <Text style={styles.errorText}>{errors.height}</Text>
                )}
                <Input
                  value={values.net_weight}
                  label={'Net Weight'}
                  onBlur={() => setFieldTouched('net_weight')}
                  onChangeText={handleChange('net_weight')}
                />
                {touched.net_weight && errors.net_weight && (
                  <Text style={styles.errorText}>{errors.net_weight}</Text>
                )}
                {/* 
                net_weight_unit
              */}
                <Input
                  value={values.weight}
                  label={'Weight'}
                  onBlur={() => setFieldTouched('weight')}
                  onChangeText={handleChange('weight')}
                />
                {touched.weight && errors.weight && (
                  <Text style={styles.errorText}>{errors.weight}</Text>
                )}
                {/* 
                weight_unit
              */}
                <Input
                  value={values.item_price}
                  label={'Item Price (Yen)'}
                  onBlur={() => setFieldTouched('item_price')}
                  onChangeText={handleChange('item_price')}
                />
                {touched.item_price && errors.item_price && (
                  <Text style={styles.errorText}>{errors.item_price}</Text>
                )}
                <Input
                  value={values.case_width}
                  label={'Case Width (centimeters)'}
                  onBlur={() => setFieldTouched('case_width')}
                  onChangeText={handleChange('case_width')}
                />
                {touched.case_width && errors.case_width && (
                  <Text style={styles.errorText}>{errors.case_width}</Text>
                )}
                <Input
                  value={values.case_depth}
                  label={'Case Depth (centimeters)'}
                  onBlur={() => setFieldTouched('case_depth')}
                  onChangeText={handleChange('case_depth')}
                />
                {touched.case_depth && errors.case_depth && (
                  <Text style={styles.errorText}>{errors.case_depth}</Text>
                )}
                <Input
                  value={values.case_height}
                  label={'Case Height (centimeters)'}
                  onBlur={() => setFieldTouched('case_height')}
                  onChangeText={handleChange('case_height')}
                />
                {touched.case_height && errors.case_height && (
                  <Text style={styles.errorText}>{errors.case_height}</Text>
                )}
                <Input
                  value={values.total_weight}
                  label={'Total Weight'}
                  onBlur={() => setFieldTouched('total_weight')}
                  onChangeText={handleChange('total_weight')}
                />
                {touched.total_weight && errors.total_weight && (
                  <Text style={styles.errorText}>{errors.total_weight}</Text>
                )}
                {/* 
                total_weight_unit
              */}
                <Input
                  value={values.quantity_per_case}
                  label={'Quantity Per Case'}
                  onBlur={() => setFieldTouched('quantity_per_case')}
                  onChangeText={handleChange('quantity_per_case')}
                />
                {touched.quantity_per_case && errors.quantity_per_case && (
                  <Text style={styles.errorText}>
                    {errors.quantity_per_case}
                  </Text>
                )}
                <Input
                  value={values.lead_time}
                  label={'Lead Time'}
                  onBlur={() => setFieldTouched('lead_time')}
                  onChangeText={handleChange('lead_time')}
                />
                {touched.lead_time && errors.lead_time && (
                  <Text style={styles.errorText}>{errors.lead_time}</Text>
                )}
                {/* 
                lead_time_unit
              */}
                <Input
                  value={values.minimum_order_quantity}
                  label={'Minimum order quantity'}
                  onBlur={() => setFieldTouched('minimum_order_quantity')}
                  onChangeText={handleChange('minimum_order_quantity')}
                />
                {touched.minimum_order_quantity &&
                  errors.minimum_order_quantity && (
                    <Text style={styles.errorText}>
                      {errors.minimum_order_quantity}
                    </Text>
                  )}
                {/* 
                oem_possibility
                manufacturer_certification
                product_certification
              */}
                <Input
                  value={values.usa_importer}
                  label={'Importer Name'}
                  onBlur={() => setFieldTouched('usa_importer')}
                  onChangeText={handleChange('usa_importer')}
                />
                {touched.usa_importer && errors.usa_importer && (
                  <Text style={styles.errorText}>{errors.usa_importer}</Text>
                )}
                <Input
                  value={values.fda_id}
                  label={'FDA Registration ID'}
                  onBlur={() => setFieldTouched('fda_id')}
                  onChangeText={handleChange('fda_id')}
                />
                {touched.fda_id && errors.fda_id && (
                  <Text style={styles.errorText}>{errors.fda_id}</Text>
                )}
                <Input
                  value={values.duns_number}
                  label={'D-U-N-S® Number'}
                  onBlur={() => setFieldTouched('duns_number')}
                  onChangeText={handleChange('duns_number')}
                />
                {touched.duns_number && errors.duns_number && (
                  <Text style={styles.errorText}>{errors.duns_number}</Text>
                )}
                {/* 
                recipe
                cooked
                label_handling
                import_experience
              */}
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
}

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: horizontalScale(18),
    marginVertical: verticalScale(24),
  },
  companyProfileContainer: {
    marginTop: verticalScale(15),
  },
  userProfileContainer: {
    marginTop: verticalScale(15),
  },
  instructions: {
    marginVertical: verticalScale(14),
    fontFamily: 'Poppins',
    fontSize: scaleFontSize(14),
    color: Colors.grayPrimary,
  },
  label: {
    marginTop: verticalScale(12),
    marginBottom: verticalScale(5),
    fontFamily: 'Monteserrat',
    fontWeight: '600',
    fontSize: scaleFontSize(12),
    lineHeight: scaleFontSize(15),
    textTransform: 'uppercase',
    color: Colors.grayPrimary,
  },
  browse: {
    width: horizontalScale(150),
    padding: horizontalScale(10),
    backgroundColor: Colors.gray600,
    color: Colors.grayPrimary,
    borderRadius: horizontalScale(10),
    borderWidth: 1,
    borderColor: Colors.grayPrimary,
  },
  browseText: {
    color: Colors.grayPrimary,
    fontSize: scaleFontSize(14),
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  image: {
    marginTop: verticalScale(12),
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  disabled: {
    opacity: 0.5,
  },
  errorText: {
    fontFamily: 'Poppins',
    marginTop: verticalScale(3),
    color: '#f00',
  },
});
