import React, {useRef, useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSquare, faSquareCheck} from '@fortawesome/free-regular-svg-icons';
import type {
  ProductScreenNavigationProp,
  ProductScreenRouteProp,
} from '../types/navigation';
import {horizontalScale, verticalScale, scaleFontSize} from '../util/scaling';
import {Colors} from '../constants/colors';
import Header from '../components/ui/Header';
import Input from '../components/ui/Input';
import {
  ManfactureLocation,
  ContentWeightUnit,
  ProductCategories,
  SaleTarget,
  ShelfLifeUnit,
  StorageTemperature,
  WeightUnit,
  DeliveryTimeUnit,
  OEMPossibility,
  YesNo,
  SellingPoint,
  ManufacturerCertifications,
  ProductCertifications,
} from '../constants/product-options';
import Button from '../components/ui/Button';
import {launchImageLibrary} from 'react-native-image-picker';
import {productCreate, productUpdate} from '../api/product';
import {RootState} from '../redux/store';
import BackButton from '../components/ui/BackButton';
import {addProduct, updateProduct} from '../redux/reducers/productSlice';

function Product(): JSX.Element {
  const ProductSchema = Yup.object().shape({
    name_en: Yup.string().required('Please enter above field'),
    name_jp: Yup.string().required('Please enter above field'),
    category_1_main: Yup.string().required('Please enter above field'),
    category_1_sub: Yup.string().required('Please enter above field'),
    intro_en: Yup.string().required('Please enter above field'),
    intro_jp: Yup.string().required('Please enter above field'),
    sale_for: Yup.string().required('Please enter above field'),
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
    cooked: Yup.string().required('Please select above field'),
    label_handling: Yup.string().required('Please enter above field'),
    import_experience: Yup.string().required('Please enter above field'),
  });

  const navigation = useNavigation<ProductScreenNavigationProp>();
  const route = useRoute<ProductScreenRouteProp>();
  const dispatch = useDispatch();

  let product = route.params.product;
  const user = useSelector((state: RootState) => state.user);
  const mainCategory = ProductCategories.mainCategory;
  const subCategories: any = ProductCategories.subCategories;
  const mainCategory1Ref = useRef<string>('');
  const subCategory1Ref = useRef<string>('');
  const [image1, setImage1] = useState('');
  const [image1FormData, setImage1FormData] = useState('');
  const [image2, setImage2] = useState('');
  const [image2FormData, setImage2FormData] = useState('');
  const saleTargetRef = useRef<string>('');
  const shelfLifeUnitRef = useRef<string>('');
  const storageTemperatureRef = useRef<string>('');
  const manuLocationRef = useRef<string>('');
  const weightUnitRef = useRef<string>('');
  const contentWeightUnitRef = useRef<string>('');
  const totalWeightUnitRef = useRef<string>('');
  const leadTimeUnitRef = useRef<string>('');
  const oemPossibilityRef = useRef<string>('');
  const recipeRef = useRef<string>('');
  const cookedRef = useRef<string>('');
  const labelHandlingRef = useRef<string>('');
  const importExpRef = useRef<string>('');

  const checkMultiSelectItem = (
    item: {label: string; value: string},
    selected?: Boolean | undefined,
  ) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
        {selected ? (
          <FontAwesomeIcon icon={faSquareCheck} size={20} />
        ) : (
          <FontAwesomeIcon icon={faSquare} size={20} />
        )}
      </View>
    );
  };

  if (product === null) {
    product = {
      id: '',
      name_en: '',
      name_jp: '',
      jan_code: '',
      category_1_main: '',
      category_1_sub: '',
      category_2_main: '',
      category_2_sub: '',
      intro_en: '',
      intro_jp: '',
      image1: '',
      image2: '',
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
    };
  } else {
    product = {
      ...product,
      specialty_diets:
        typeof product.specialty_diets === 'string'
          ? product.specialty_diets.split(',')
          : '',
      manufacturer_certification:
        typeof product.manufacturer_certification === 'string'
          ? product.manufacturer_certification.split(',')
          : '',
      product_certification:
        typeof product.product_certification === 'string'
          ? product.product_certification.split(',')
          : '',
      usa_importer:
        product.usa_importer === '無'
          ? ''
          : product.usa_importer.split('有 | ')[1],
      fda_id: product.fda_id === '無' ? '' : product.fda_id.split('有 | ')[1],
      duns_number:
        product.duns_number === '無'
          ? ''
          : product.duns_number.split('有 | ')[1],
    };
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <BackButton onPress={() => navigation.goBack()} />
          <Formik
            initialValues={product}
            validateOnMount={true}
            validationSchema={ProductSchema}
            onSubmit={async values => {
              let formData = new FormData();
              if (Object.keys(image1FormData).length > 0) {
                formData.append('image', image1FormData);
              } else {
                formData.append('image_path_1', values.image_path_1);
              }
              if (Object.keys(image2FormData).length > 0) {
                formData.append('image2', image2FormData);
              } else {
                formData.append('image_path_2', values.image_path_2);
              }
              formData.append('name_en', values.name_en);
              formData.append('name_jp', values.name_jp);
              formData.append('jan_code', '');
              formData.append('category_1_main', values.category_1_main);
              formData.append('category_1_sub', values.category_1_sub);
              formData.append('category_2_main', values.category_2_main);
              formData.append('category_2_sub', values.category_2_sub);
              formData.append('intro_en', values.intro_en);
              formData.append('intro_jp', values.intro_jp);
              formData.append('youtube_url', values.youtube_url);
              formData.append('sale_for', values.sale_for);
              const specialtyDietsStr = Array.isArray(values.specialty_diets)
                ? values.specialty_diets.join(',')
                : '';
              formData.append('specialty_diets', specialtyDietsStr);
              formData.append('ingredients_en', values.ingredients_en);
              formData.append('ingredients_jp', values.ingredients_jp);
              formData.append('allergens_en', values.allergens_en);
              formData.append('allergens_jp', values.allergens_jp);
              formData.append('shelf_life', +values.shelf_life);
              formData.append('shelf_life_unit', values.shelf_life_unit);
              formData.append(
                'storage_temperature',
                values.storage_temperature,
              );
              formData.append(
                'manufacture_location',
                values.manufacture_location,
              );
              formData.append(
                'manufacture_location_jp',
                values.manufacture_location,
              );
              formData.append('width', +values.width);
              formData.append('depth', +values.depth);
              formData.append('height', +values.height);
              formData.append('net_weight', +values.net_weight);
              formData.append('net_weight_unit', values.net_weight_unit);
              formData.append('weight', +values.weight);
              formData.append('weight_unit', values.weight_unit);
              formData.append('item_price', values.item_price.toString());
              formData.append('case_width', +values.case_width);
              formData.append('case_depth', +values.case_depth);
              formData.append('case_height', +values.case_height);
              formData.append('total_weight', +values.total_weight);
              formData.append('total_weight_unit', values.total_weight_unit);
              formData.append('quantity_per_case', +values.quantity_per_case);
              formData.append('lead_time', +values.lead_time);
              formData.append('lead_time_unit', values.lead_time_unit);
              formData.append(
                'minimum_order_quantity',
                +values.minimum_order_quantity,
              );
              formData.append('oem_possibility', values.oem_possibility);
              const manuCertStr = Array.isArray(
                values.manufacturer_certification,
              )
                ? values.manufacturer_certification.join(',')
                : '';
              formData.append('manufacturer_certification', manuCertStr);
              const productCertStr = Array.isArray(values.product_certification)
                ? values.product_certification.join(',')
                : '';
              formData.append('product_certification', productCertStr);
              if (values.usa_importer === '') {
                formData.append('usa_importer', '無');
              } else {
                formData.append('usa_importer', '有 | ' + values.usa_importer);
              }

              if (values.fda_id === '') {
                formData.append('fda_id', '無');
              } else {
                formData.append('fda_id', '有 | ' + values.fda_id);
              }

              if (values.duns_number === '') {
                formData.append('duns_number', '無');
              } else {
                formData.append('duns_number', '有 | ' + values.duns_number);
              }

              formData.append('recipe', values.recipe);
              formData.append('cooked', values.cooked);
              formData.append('label_handling', values.label_handling);
              formData.append('import_experience', values.import_experience);

              let response;

              if (values.id) {
                formData.append('_method', 'PATCH');

                response = await productUpdate(user.token, values.id, formData);
                if (response) {
                  console.log('response', response);
                  dispatch(updateProduct(response));
                  Toast.show({
                    type: 'success',
                    text1: 'Product updated successfully',
                    visibilityTime: 3000,
                    position: 'bottom',
                  });
                  setTimeout(() => {
                    navigation.navigate('Dashboard');
                  }, 500);
                }
              } else {
                response = await productCreate(user.token, formData);
                if (response) {
                  dispatch(addProduct(response.product));
                  Toast.show({
                    type: 'success',
                    text1: 'Product created successfully',
                    visibilityTime: 3000,
                    position: 'bottom',
                  });
                  setTimeout(() => {
                    navigation.navigate('Dashboard');
                  }, 500);
                }
              }
            }}>
            {({
              values,
              touched,
              errors,
              setFieldTouched,
              setFieldValue,
              handleChange,
              handleSubmit,
            }) => (
              <>
                <Header type={1}>PRODUCT DETAILS</Header>
                <Text style={styles.instructions}>
                  Fields labeled (Japanese) are not forced. You may enter
                  English instead.
                </Text>
                <Input
                  value={values.name_en?.toString()}
                  label={'Product Name'}
                  onBlur={() => setFieldTouched('name_en')}
                  onChangeText={handleChange('name_en')}
                />
                {touched.name_en && errors.name_en && (
                  <Text style={styles.errorText}>{errors.name_en}</Text>
                )}
                <Input
                  value={values.name_jp?.toString()}
                  label={'Product Name (Japanese)'}
                  onBlur={() => setFieldTouched('name_jp')}
                  onChangeText={handleChange('name_jp')}
                />
                {touched.name_jp && errors.name_jp && (
                  <Text style={styles.errorText}>{errors.name_jp}</Text>
                )}
                <Input
                  value={values.jan_code?.toString()}
                  label={'JAN Code'}
                  onBlur={() => setFieldTouched('jan_code')}
                  onChangeText={handleChange('jan_code')}
                />
                <Text style={styles.label}>Main Category 1</Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  itemTextStyle={styles.ddItemTextStyle}
                  data={mainCategory}
                  value={values.category_1_main}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select item"
                  fontFamily={'Poppins'}
                  onBlur={() => setFieldTouched('category_1_main')}
                  onChange={item => {
                    mainCategory1Ref.current = item.value;
                    setFieldValue('category_1_main', item.value);
                  }}
                />
                {touched.category_1_main &&
                  errors.category_1_main &&
                  mainCategory1Ref.current === '' && (
                    <Text style={styles.errorText}>
                      {errors.category_1_main}
                    </Text>
                  )}
                {values.category_1_main && (
                  <>
                    <Text style={styles.label}>Sub Category 1</Text>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      itemTextStyle={styles.ddItemTextStyle}
                      data={subCategories[values.category_1_main]}
                      value={values.category_1_sub}
                      search={false}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select item"
                      fontFamily={'Poppins'}
                      onBlur={() => setFieldTouched('category_1_sub')}
                      onChange={item => {
                        subCategory1Ref.current = item.value;
                        setFieldValue('category_1_sub', item.value);
                      }}
                    />
                    {touched.category_1_sub &&
                      errors.category_1_sub &&
                      subCategory1Ref.current === '' && (
                        <Text style={styles.errorText}>
                          {errors.category_1_sub}
                        </Text>
                      )}
                  </>
                )}
                <Text style={styles.label}>Main Category 2</Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  itemTextStyle={styles.ddItemTextStyle}
                  data={mainCategory}
                  value={values.category_2_main}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select item"
                  fontFamily={'Poppins'}
                  onChange={item => {
                    setFieldValue('category_2_main', item.value);
                  }}
                />
                {values.category_2_main && (
                  <>
                    <Text style={styles.label}>Sub Category 2</Text>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      itemTextStyle={styles.ddItemTextStyle}
                      data={subCategories[values.category_2_main]}
                      value={values.category_2_sub}
                      search={false}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select item"
                      fontFamily={'Poppins'}
                      onChange={item =>
                        setFieldValue('category_2_sub', item.value)
                      }
                    />
                  </>
                )}
                <Input
                  value={values.intro_en?.toString()}
                  label={'Introduction'}
                  multiline={true}
                  onBlur={() => setFieldTouched('intro_en')}
                  onChangeText={handleChange('intro_en')}
                />
                {touched.intro_en && errors.intro_en && (
                  <Text style={styles.errorText}>{errors.intro_en}</Text>
                )}
                <Input
                  value={values.intro_jp?.toString()}
                  label={'Introduction (Japanese)'}
                  multiline={true}
                  onBlur={() => setFieldTouched('intro_jp')}
                  onChangeText={handleChange('intro_jp')}
                />
                {touched.intro_jp && errors.intro_jp && (
                  <Text style={styles.errorText}>{errors.intro_jp}</Text>
                )}
                <Text style={styles.label}>Product Image</Text>
                <TouchableOpacity
                  style={styles.browse}
                  onPress={async () => {
                    const result: any = await launchImageLibrary({
                      mediaType: 'photo',
                    });
                    if (result) {
                      setImage1(result.assets[0].uri);
                      const uri =
                        Platform.OS === 'android'
                          ? result.assets[0].uri
                          : result.assets[0].uri.replace('file://', '');
                      setImage1FormData({
                        uri: uri,
                        type: result.assets[0].type,
                        name: result.assets[0].fileName,
                      });
                    }
                  }}>
                  <Text style={styles.browseText}>Browse Image</Text>
                </TouchableOpacity>
                {image1 && (
                  <Image style={styles.image} source={{uri: image1}} />
                )}
                {values.image_path_1 && !image1 ? (
                  <Image
                    style={styles.image}
                    source={{
                      uri: `https://pf.8dotz.com/images/products/${values.image_path_1}`,
                    }}
                  />
                ) : null}
                <Text style={styles.label}>Product Image (Back)</Text>
                <TouchableOpacity
                  style={styles.browse}
                  onPress={async () => {
                    const result: any = await launchImageLibrary({
                      mediaType: 'photo',
                    });
                    if (result) {
                      setImage2(result.assets[0].uri);
                      const uri =
                        Platform.OS === 'android'
                          ? result.assets[0].uri
                          : result.assets[0].uri.replace('file://', '');
                      setImage2FormData({
                        uri: uri,
                        type: result.assets[0].type,
                        name: result.assets[0].fileName,
                      });
                    }
                  }}>
                  <Text style={styles.browseText}>Browse Image</Text>
                </TouchableOpacity>
                {image2 && (
                  <Image style={styles.image} source={{uri: image2}} />
                )}
                {values.image_path_2 && !image2 ? (
                  <Image
                    style={styles.image}
                    source={{
                      uri: `https://pf.8dotz.com/images/products/${values.image_path_2}`,
                    }}
                  />
                ) : null}
                <Input
                  value={values.youtube_url?.toString()}
                  label={'Introduction Video (YouTube URL)'}
                  onBlur={() => setFieldTouched('youtube_url')}
                  onChangeText={handleChange('youtube_url')}
                />
                <Text style={styles.label}>Sale Target</Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  itemTextStyle={styles.ddItemTextStyle}
                  data={SaleTarget}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select item"
                  fontFamily={'Poppins'}
                  onBlur={() => setFieldTouched('sale_for')}
                  onChange={item => {
                    saleTargetRef.current = item.value;
                    setFieldValue('sale_for', item.value);
                  }}
                />
                {touched.sale_for &&
                  errors.sale_for &&
                  saleTargetRef.current === '' && (
                    <Text style={styles.errorText}>{errors.sale_for}</Text>
                  )}
                <Text style={styles.label}>Selling Point</Text>
                <MultiSelect
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  search={false}
                  data={SellingPoint}
                  value={values.specialty_diets}
                  labelField="label"
                  valueField="value"
                  placeholder="Select items"
                  selectedStyle={styles.selectedStyle}
                  onBlur={() => setFieldTouched('specialty_diets')}
                  onChange={item => setFieldValue('specialty_diets', item)}
                  renderItem={checkMultiSelectItem}
                />
                <Input
                  value={values.ingredients_en?.toString()}
                  label={'Ingredients'}
                  multiline={true}
                  onBlur={() => setFieldTouched('ingredients_en')}
                  onChangeText={handleChange('ingredients_en')}
                />
                {touched.ingredients_en && errors.ingredients_en && (
                  <Text style={styles.errorText}>{errors.ingredients_en}</Text>
                )}
                <Input
                  value={values.ingredients_jp?.toString()}
                  label={'Ingredients (Japanese)'}
                  multiline={true}
                  onBlur={() => setFieldTouched('ingredients_jp')}
                  onChangeText={handleChange('ingredients_jp')}
                />
                {touched.ingredients_jp && errors.ingredients_jp && (
                  <Text style={styles.errorText}>{errors.ingredients_jp}</Text>
                )}
                <Input
                  value={values.allergens_en?.toString()}
                  label={'Allergens'}
                  multiline={true}
                  onBlur={() => setFieldTouched('allergens_en')}
                  onChangeText={handleChange('allergens_en')}
                />
                {touched.allergens_en && errors.allergens_en && (
                  <Text style={styles.errorText}>{errors.allergens_en}</Text>
                )}
                <Input
                  value={values.allergens_jp?.toString()}
                  label={'Allergens (Japanese)'}
                  multiline={true}
                  onBlur={() => setFieldTouched('allergens_jp')}
                  onChangeText={handleChange('allergens_jp')}
                />
                {touched.allergens_jp && errors.allergens_jp && (
                  <Text style={styles.errorText}>{errors.allergens_jp}</Text>
                )}
                <View style={styles.twoItems}>
                  <View style={styles.halfWidth}>
                    <Input
                      value={values.shelf_life?.toString()}
                      keyboardType={'numeric'}
                      label={'Shelf Life'}
                      onBlur={() => setFieldTouched('shelf_life')}
                      onChangeText={handleChange('shelf_life')}
                    />
                    {touched.shelf_life && errors.shelf_life && (
                      <Text style={styles.errorText}>{errors.shelf_life}</Text>
                    )}
                  </View>
                  <View style={styles.halfWidth}>
                    <Text style={styles.label}>Shelf Life Unit</Text>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      itemTextStyle={styles.ddItemTextStyle}
                      data={ShelfLifeUnit}
                      search={false}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select item"
                      fontFamily={'Poppins'}
                      onBlur={() => setFieldTouched('shelf_life_unit')}
                      onChange={item => {
                        shelfLifeUnitRef.current = item.value;
                        setFieldValue('shelf_life_unit', item.value);
                      }}
                    />
                    {touched.shelf_life_unit &&
                      errors.shelf_life_unit &&
                      shelfLifeUnitRef.current === '' && (
                        <Text style={styles.errorText}>
                          {errors.shelf_life_unit}
                        </Text>
                      )}
                  </View>
                </View>
                <Text style={styles.label}>Storage Temperature Range</Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  itemTextStyle={styles.ddItemTextStyle}
                  data={StorageTemperature}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select item"
                  fontFamily={'Poppins'}
                  onBlur={() => setFieldTouched('storage_temperature')}
                  onChange={item => {
                    storageTemperatureRef.current = item.value;
                    setFieldValue('storage_temperature', item.value);
                  }}
                />
                {touched.storage_temperature &&
                  errors.storage_temperature &&
                  storageTemperatureRef.current === '' && (
                    <Text style={styles.errorText}>
                      {errors.storage_temperature}
                    </Text>
                  )}
                <Text style={styles.label}>Manufacture Location</Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  itemTextStyle={styles.ddItemTextStyle}
                  data={ManfactureLocation}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select item"
                  fontFamily={'Poppins'}
                  onBlur={() => setFieldTouched('manufacture_location')}
                  onChange={item => {
                    manuLocationRef.current = item.value;
                    setFieldValue('manufacture_location', item.value);
                  }}
                />
                {touched.manufacture_location &&
                  errors.manufacture_location &&
                  manuLocationRef.current === '' && (
                    <Text style={styles.errorText}>
                      {errors.manufacture_location}
                    </Text>
                  )}
                <Input
                  value={values.width?.toString()}
                  label={'Width'}
                  onBlur={() => setFieldTouched('width')}
                  onChangeText={handleChange('width')}
                />
                {touched.width && errors.width && (
                  <Text style={styles.errorText}>{errors.width}</Text>
                )}
                <Input
                  value={values.depth?.toString()}
                  label={'Depth'}
                  onBlur={() => setFieldTouched('depth')}
                  onChangeText={handleChange('depth')}
                />
                {touched.depth && errors.depth && (
                  <Text style={styles.errorText}>{errors.depth}</Text>
                )}
                <Input
                  value={values.height?.toString()}
                  label={'Height'}
                  onBlur={() => setFieldTouched('height')}
                  onChangeText={handleChange('height')}
                />
                {touched.height && errors.height && (
                  <Text style={styles.errorText}>{errors.height}</Text>
                )}
                <View style={styles.twoItems}>
                  <View style={styles.halfWidth}>
                    <Input
                      value={values.net_weight?.toString()}
                      label={'Content Weight'}
                      keyboardType={'decimal-pad'}
                      onBlur={() => setFieldTouched('net_weight')}
                      onChangeText={handleChange('net_weight')}
                    />
                    {touched.net_weight && errors.net_weight && (
                      <Text style={styles.errorText}>{errors.net_weight}</Text>
                    )}
                  </View>
                  <View style={styles.halfWidth}>
                    <Text style={styles.label}>Content Weight Unit</Text>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      itemTextStyle={styles.ddItemTextStyle}
                      data={ContentWeightUnit}
                      search={false}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select item"
                      fontFamily={'Poppins'}
                      onBlur={() => setFieldTouched('net_weight_unit')}
                      onChange={item => {
                        contentWeightUnitRef.current = item.value;
                        setFieldValue('net_weight_unit', item.value);
                      }}
                    />
                    {touched.net_weight_unit &&
                      errors.net_weight_unit &&
                      contentWeightUnitRef.current === '' && (
                        <Text style={styles.errorText}>
                          {errors.net_weight_unit}
                        </Text>
                      )}
                  </View>
                </View>
                <View style={styles.twoItems}>
                  <View style={styles.halfWidth}>
                    <Input
                      value={values.weight?.toString()}
                      label={'Weight'}
                      onBlur={() => setFieldTouched('weight')}
                      onChangeText={handleChange('weight')}
                    />
                    {touched.weight && errors.weight && (
                      <Text style={styles.errorText}>{errors.weight}</Text>
                    )}
                  </View>
                  <View style={styles.halfWidth}>
                    <Text style={styles.label}>Weight Unit</Text>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      itemTextStyle={styles.ddItemTextStyle}
                      data={WeightUnit}
                      value={values.weight_unit}
                      search={false}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select item"
                      fontFamily={'Poppins'}
                      onBlur={() => setFieldTouched('weight_unit')}
                      onChange={item => {
                        weightUnitRef.current = item.value;
                        setFieldValue('weight_unit', item.value);
                      }}
                    />
                    {touched.weight_unit &&
                      errors.weight_unit &&
                      weightUnitRef.current === '' && (
                        <Text style={styles.errorText}>
                          {errors.weight_unit}
                        </Text>
                      )}
                  </View>
                </View>
                <Input
                  value={values.item_price?.toString()}
                  label={'Item Price (Yen)'}
                  onBlur={() => setFieldTouched('item_price')}
                  onChangeText={handleChange('item_price')}
                />
                {touched.item_price && errors.item_price && (
                  <Text style={styles.errorText}>{errors.item_price}</Text>
                )}
                <Input
                  value={values.case_width?.toString()}
                  label={'Case Width (centimeters)'}
                  onBlur={() => setFieldTouched('case_width')}
                  onChangeText={handleChange('case_width')}
                />
                {touched.case_width && errors.case_width && (
                  <Text style={styles.errorText}>{errors.case_width}</Text>
                )}
                <Input
                  value={values.case_depth?.toString()}
                  label={'Case Depth (centimeters)'}
                  onBlur={() => setFieldTouched('case_depth')}
                  onChangeText={handleChange('case_depth')}
                />
                {touched.case_depth && errors.case_depth && (
                  <Text style={styles.errorText}>{errors.case_depth}</Text>
                )}
                <Input
                  value={values.case_height?.toString()}
                  label={'Case Height (centimeters)'}
                  onBlur={() => setFieldTouched('case_height')}
                  onChangeText={handleChange('case_height')}
                />
                {touched.case_height && errors.case_height && (
                  <Text style={styles.errorText}>{errors.case_height}</Text>
                )}
                <View style={styles.twoItems}>
                  <View style={styles.halfWidth}>
                    <Input
                      value={values.total_weight?.toString()}
                      label={'Case Weight'}
                      onBlur={() => setFieldTouched('total_weight')}
                      onChangeText={handleChange('total_weight')}
                    />
                    {touched.total_weight && errors.total_weight && (
                      <Text style={styles.errorText}>
                        {errors.total_weight}
                      </Text>
                    )}
                  </View>
                  <View style={styles.halfWidth}>
                    <Text style={styles.label}>Case Weight Unit</Text>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      itemTextStyle={styles.ddItemTextStyle}
                      data={WeightUnit}
                      value={values.total_weight_unit}
                      search={false}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select item"
                      fontFamily={'Poppins'}
                      onBlur={() => setFieldTouched('total_weight_unit')}
                      onChange={item => {
                        totalWeightUnitRef.current = item.value;
                        setFieldValue('total_weight_unit', item.value);
                      }}
                    />
                    {touched.total_weight_unit &&
                      errors.total_weight_unit &&
                      totalWeightUnitRef.current === '' && (
                        <Text style={styles.errorText}>
                          {errors.total_weight_unit}
                        </Text>
                      )}
                  </View>
                </View>
                <Input
                  value={values.quantity_per_case?.toString()}
                  label={'Quantity Per Case'}
                  onBlur={() => setFieldTouched('quantity_per_case')}
                  onChangeText={handleChange('quantity_per_case')}
                />
                {touched.quantity_per_case && errors.quantity_per_case && (
                  <Text style={styles.errorText}>
                    {errors.quantity_per_case}
                  </Text>
                )}
                <View style={styles.twoItems}>
                  <View style={styles.halfWidth}>
                    <Input
                      value={values.lead_time?.toString()}
                      label={'Delivery Time'}
                      onBlur={() => setFieldTouched('lead_time')}
                      onChangeText={handleChange('lead_time')}
                    />
                    {touched.lead_time && errors.lead_time && (
                      <Text style={styles.errorText}>{errors.lead_time}</Text>
                    )}
                  </View>
                  <View style={styles.halfWidth}>
                    <Text style={styles.label}>Delivery Time Unit</Text>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      itemTextStyle={styles.ddItemTextStyle}
                      data={DeliveryTimeUnit}
                      value={values.lead_time_unit}
                      search={false}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select item"
                      fontFamily={'Poppins'}
                      onBlur={() => setFieldTouched('lead_time_unit')}
                      onChange={item => {
                        leadTimeUnitRef.current = item.value;
                        setFieldValue('lead_time_unit', item.value);
                      }}
                    />
                    {touched.lead_time_unit &&
                      errors.lead_time_unit &&
                      leadTimeUnitRef.current === '' && (
                        <Text style={styles.errorText}>
                          {errors.lead_time_unit}
                        </Text>
                      )}
                  </View>
                </View>
                <Input
                  value={values.minimum_order_quantity?.toString()}
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
                <Text style={styles.label}>OEM Possibility</Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  itemTextStyle={styles.ddItemTextStyle}
                  data={OEMPossibility}
                  value={values.oem_possibility}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select item"
                  fontFamily={'Poppins'}
                  onChange={item => {
                    oemPossibilityRef.current = item.value;
                    setFieldValue('oem_possibility', item.value);
                  }}
                />
                <Text style={styles.label}>Manufacturer Certification(s)</Text>
                <MultiSelect
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  search={false}
                  data={ManufacturerCertifications}
                  value={values.manufacturer_certification}
                  labelField="label"
                  valueField="value"
                  placeholder="Select items"
                  selectedStyle={styles.selectedStyle}
                  onChange={item => {
                    setFieldValue('manufacturer_certification', item);
                  }}
                  renderItem={checkMultiSelectItem}
                />
                <Text style={styles.label}>Product Certification(s)</Text>
                <MultiSelect
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  search={false}
                  data={ProductCertifications}
                  value={values.product_certification}
                  labelField="label"
                  valueField="value"
                  placeholder="Select items"
                  selectedStyle={styles.selectedStyle}
                  onBlur={() => setFieldTouched('product_certification')}
                  onChange={item => {
                    setFieldValue('product_certification', item);
                  }}
                  renderItem={checkMultiSelectItem}
                />
                <Input
                  value={values.usa_importer?.toString()}
                  label={'Importer Name'}
                  onBlur={() => setFieldTouched('usa_importer')}
                  onChangeText={handleChange('usa_importer')}
                />
                {touched.usa_importer && errors.usa_importer && (
                  <Text style={styles.errorText}>{errors.usa_importer}</Text>
                )}
                <Input
                  value={values.fda_id?.toString()}
                  label={'FDA Registration ID'}
                  onBlur={() => setFieldTouched('fda_id')}
                  onChangeText={handleChange('fda_id')}
                />
                <Input
                  value={values.duns_number?.toString()}
                  label={'D-U-N-S® Number'}
                  onBlur={() => setFieldTouched('duns_number')}
                  onChangeText={handleChange('duns_number')}
                />
                <Text style={styles.label}>
                  Does the product include recipes?
                </Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  itemTextStyle={styles.ddItemTextStyle}
                  data={YesNo}
                  value={values.recipe}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select item"
                  fontFamily={'Poppins'}
                  onChange={item => {
                    recipeRef.current = item.value;
                    setFieldValue('recipe', item.value);
                  }}
                />
                <Text style={styles.label}>
                  Does the product require cooking?
                </Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  itemTextStyle={styles.ddItemTextStyle}
                  data={YesNo}
                  value={values.cooked}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select item"
                  fontFamily={'Poppins'}
                  onBlur={() => setFieldTouched('cooked')}
                  onChange={item => {
                    cookedRef.current = item.value;
                    setFieldValue('cooked', item.value);
                  }}
                />
                {touched.cooked &&
                  errors.cooked &&
                  cookedRef.current === '' && (
                    <Text style={styles.errorText}>{errors.cooked}</Text>
                  )}
                <Text style={styles.label}>
                  Have you created label for local use?
                </Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  itemTextStyle={styles.ddItemTextStyle}
                  data={YesNo}
                  value={values.label_handling}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select item"
                  fontFamily={'Poppins'}
                  onBlur={() => setFieldTouched('label_handling')}
                  onChange={item => {
                    labelHandlingRef.current = item.value;
                    setFieldValue('label_handling', item.value);
                  }}
                />
                {touched.label_handling &&
                  errors.label_handling &&
                  labelHandlingRef.current === '' && (
                    <Text style={styles.errorText}>
                      Please select above field
                    </Text>
                  )}
                <Text style={styles.label}>Previous import experience?</Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  itemTextStyle={styles.ddItemTextStyle}
                  data={YesNo}
                  value={values.import_experience}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select item"
                  fontFamily={'Poppins'}
                  onBlur={() => setFieldTouched('import_experience')}
                  onChange={item => {
                    importExpRef.current = item.value;
                    setFieldValue('import_experience', item.value);
                  }}
                />
                {touched.import_experience &&
                  errors.import_experience &&
                  importExpRef.current === '' && (
                    <Text style={styles.errorText}>
                      {errors.import_experience}
                    </Text>
                  )}
                <Button
                  isDisabled={false}
                  title={
                    product && product.id
                      ? 'UPDATE PRODUCT'
                      : 'REGISTER PRODUCT'
                  }
                  onPress={handleSubmit}
                />
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
    marginVertical: verticalScale(12),
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
  dropdown: {
    padding: horizontalScale(5),
    height: verticalScale(30),
    borderColor: Colors.gray600,
    borderWidth: 1,
    borderRadius: horizontalScale(10),
  },
  ddItemTextStyle: {
    padding: 0,
    margin: 0,
    lineHeight: verticalScale(0),
    fontSize: scaleFontSize(14),
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: scaleFontSize(14),
  },
  selectedTextStyle: {
    fontSize: scaleFontSize(14),
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  twoItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '49%',
  },
});
