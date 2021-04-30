import {
  FieldValidator,
  ArrayHelpers,
  FieldConfig,
  FormikContextType,
  FormikConfig,
  FormikHelpers,
  FormikValues,
} from 'formik';
import { nodeMapping } from './fields';

type GetCompProps<T> = T extends React.ComponentType<infer P> | React.Component<infer P> ? P : never;

type BaseMapping = typeof nodeMapping;

/**
 * `C`: `config`配置的类型
 * `V`: 表单的数据类型
 */
export interface RendererProps<C, V> {
  /**
   * 表单配置项，详细API：[NodeConfig](/api/config#api-nodeconfig) <br/>
   * 关于泛型`T`：可选，使用三方库时必须传入，否则无法识别配置项中的类型。详情参考[三方库Demo](/demo/blueprint)。
   * @type NodeConfig<T> | NodeConfig<T>[];
   */
  config: NodeConfig<C> | NodeConfig<C>[];

  /**
   * 表单初始数据。如果没有初始数据，可以通过`getDefaultValues`获取。
   */
  values: V;

  /**
   * 表单提交后的回调，如果表单校验失败，不会触发此函数。
   */
  onSubmit: FormikConfig<V>['onSubmit'];

  /**
   * 渲染表单函数。在需要将表单添加到特定场景 或 需要使用 formik 对象时可以使用。<br/>
   * 函数参数api见
   */
  render?: (props: RendererRenderParam<V>) => JSX.Element;

  /**
   * 样式前缀，自定义样式时使用，参考[自定义样式demo](/demo/custom-style)
   * @default "ffr"
   */
  prefixcls?: string;

  /**
   * 默认数据。区别于values，此数据在表单内部是不可变的。
   * 一般情况下不用传入，仅在`type="array"`时会用到，例如：数组在做新增操作时需要取默认数据。
   */
  defaultValues?: V;

  /**
   * 自定义组件映射。`key: 组件类型名称、value: 自定义组件`
   * @default object
   */
  mapping?: C;

  /**
   * 是否自动提交表单。如果开启，修改表单时会自动提交，校验通过后触发 onSubmit
   * @default false
   */
  autoSubmit?: boolean;

  /**
   * Formik表单库的其他配置
   */
  formikProps?: Omit<FormikConfig<V>, 'initialValues' | 'initialStatus' | 'onSubmit'>;

  /**
   * 自定义起始路径
   */
  rootName?: string;

  /**
   * 是否根据数据渲染表单，默认关闭。
   * 当开启后会根据已有数据渲染，当配置项中的name与数据不匹配时，不渲染节点。
   */
  syncWithData?: boolean;
}

export interface BaseNodeConfig<U extends keyof T, T> {
  /**
   * 节点类型，库自身定义了一些默认类型，见右侧。<br/>
   * 扩展（或覆盖）其他类型请参考：[三方库Demo](/demo/blueprint)
   */
  type: U;

  /**
   * 节点数据的key字段，值有以下几种:
   * - `"a"`：普通标识。表示对象中key为`a`的数据。
   * - `""`：空值。在做数据提升、异构时会被用到，会自动连接上下节点。
   * - `"../a"`、'"../../a/b"'：相对路径。将当前节点提升至上层。数据与UI异构时会用到。
   * - `"#/a/b/c"`：绝对路径，使用`#`号表示。
   * - `a[]`：数组节点。末尾使用`[]`中括号表示。一般用于`array`类型的节点中。
   */
  name: string;

  /**
   * 表单左侧文本，如果不设置，节点对应组件会顶到左侧。类型可以为函数，参考[NodeFuncParam](#api-nodefuncparam)
   */
  label?: React.ReactNode | ((param: NodeFuncParam) => React.ReactNode);

  /**
   * 节点组件的具体属性。该类型使用联合类型声明，使用`type`字段区分各组件类型。<br/>
   * 当使用自定义组件时，需要在`NodeConfig`中传入自定义组件映射的类型。 <br/>
   * 具体可参考：[三方库Demo](/demo/blueprint) <br/>
   * 类型可以为函数，参考[NodeFuncParam](#api-nodefuncparam)
   * @type object | (param: NodeFuncParam) => object
   */
  props?: GetNodeProps<T[U]> | ((param: NodeFuncParam) => GetNodeProps<T[U]>);

  /**
   * 子节点
   */
  children?: NodeConfig<T>[];

  /**
   * 节点默认值。设置的默认值可以通过`getDefaultValues`函数获取到，并传入`Renderer`组件中进行使用。<br/>
   * Tips：如果当前节点设置了children,此节点是不会set默认值的。
   */
  default?: unknown;

  /**
   * 表单校验，值可为函数 或 函数数组，关于校验函数，参考：[formik valiate](https://formik.org/docs/api/field#validate)
   */
  validate?: FieldValidator[] | ((value: any, param: NodeFuncParam) => ReturnType<FieldValidator>);

  /**
   * 节点数据变化回调函数，只在表单校验通过时触发。
   */
  onChange?: (param: NodeFuncParam) => void;

  /**
   * 当前节点是否显示。通过函数的入参，获取到其他节点数据后动态显示当前节点，值为`false`时不渲染当前节点。
   */
  show?: (param: NodeFuncParam) => boolean;

  /**
   * 当前节点的样式名称
   */
  className?: string;
}

/**
 * 配置项中值为函数的参数类型
 */
export type NodeFuncParam = {
  /** 当前节点的完整name，例如：`a.b.c.0.d` */
  name: string;

  /** 父节点的name */
  parentName: string;

  /** 当前节点数据 */
  value: any;

  /** 父节点数据（配置结构上的，而非数据结构）。*/
  parentValue: any;

  /** 变更前的数据 */
  oldValue: any;

  /**
   * 设置其他节点数据的函数
   * @type (name: string, value: unknow, shouldValidate?: boolean) => void
   */
  setValue: FormikHelpers<any>['setFieldValue'];

  /**
   * 获取节点数据。
   * - `name`：节点的name
   * - `path`：相对路径，解析方式同 resolveName
   */
  getValue: (name: string, path?: string) => any;
};

/**
 * `Renderer`组件的子组件函数参数声明
 */
export interface RendererRenderParam<V> {
  /**
   * 表单元素
   */
  form: JSX.Element;
  /**
   * formik对象，参考[formik](https://formik.org/docs/api/formik)
   */
  formik: FormikContextType<V>;
}

/**
 * 根据type分发联合类型
 */
type Distribute<U, T> = U extends keyof T ? BaseNodeConfig<U, T> : never;

/**
 * 配置声明，外部真正使用到的类型
 */
export type NodeConfig<T = unknown> = Distribute<keyof (BaseMapping & T), BaseMapping & T>;

/**
 * 节点组件的属性声明
 */
export type NodeProps = {
  /** 节点配置信息 */
  node: NodeConfig;
  /** 父节点的name */
  parentName: string;
};

/**
 * 自定义组件的props类型声明。
 * 如果自定义组件不想使用`withField`包裹，可以这样使用：
 * ```tsx
 * import type { NodeCustomProps } from 'formik-form-render';
 * interface CustomProps extends NodeCustomProps {
 *   test?: string
 * }
 *
 * export default (props: CustomProps) => {
 *   // your code...
 * }
 * ```
 */
export interface NodeCustomProps extends Pick<FieldConfig, 'name' | 'validate'> {
  defaultValues: any;
  arrayHelpers?: ArrayHelpers;
  children?: React.ReactNode;
}

export type IFormikStatus = Pick<
  RendererProps<BaseMapping, FormikValues>,
  'defaultValues' | 'mapping' | 'prefixcls' | 'syncWithData'
>;

/**
 * 获取节点`props`属性的类型：
 * 1. mapping对象的值是`React.FC`，使用`GetCompProps`获取组件的`Props`
 * 2. 使用`Omit`忽略掉提前定义好的类型（这些类型仅在逻辑中使用，配置项中不需要展示出来）
 */
type GetNodeProps<T> = Omit<GetCompProps<T>, keyof NodeCustomProps>;
