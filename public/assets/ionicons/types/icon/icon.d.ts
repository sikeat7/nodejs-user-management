import '../stencil.core';
export declare class Icon {
    private svgContent;
    private isServer;
    private publicPath;
    mode: string;
    /**
     * The color to use from your Sass `$colors` map.
     * Default options are: `"primary"`, `"secondary"`, `"danger"`, `"light"`, and `"dark"`.
     * For more information, see [Theming your App](/docs/theming/theming-your-app).
     */
    color: string;
    /**
     * Specifies the label to use for accessibility. Defaults to the icon name.
     */
    ariaLabel: string;
    /**
     * Specifies which icon to use on `ios` mode.
     */
    ios: string;
    /**
     * Specifies which icon to use on `md` mode.
     */
    md: string;
    /**
     * Specifies which icon to use. The appropriate icon will be used based on the mode.
     * For more information, see [Ionicons](/docs/ionicons/).
     */
    name: string;
    /**
     * The size of the icon.
     * Available options are: `"small"` and `"large"`.
     */
    size: string;
    private readonly iconName;
    hostData(): {
        class: {};
    };
    render(): JSX.Element;
}
