import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const PageContext = React.createContext();

export const PageContextProvider = ({ pageContext, children }) => {
	const { i18n } = useTranslation();
	useEffect(() => {
		let mounted = true;
		if (i18n.language !== pageContext.lang && mounted) {
			i18n.changeLanguage(pageContext.lang);
		}
		return () => {
			mounted = false;
		};
	}, [pageContext.lang]);

	return (
		<PageContext.Provider value={pageContext} pageContext={pageContext}>
			{children}
		</PageContext.Provider>
	);
};

PageContextProvider.propTypes = {
	pageContext: PropTypes.objectOf(PropTypes.any).isRequired,
	children: PropTypes.node.isRequired
};

export const usePageContext = () => React.useContext(PageContext);
