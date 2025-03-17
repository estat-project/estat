/*********************************************************/
/*                                                       */
/*           programs for logistic regression            */
/*                                                       */
/*********************************************************/

//****************************************************************************
// purpose : logistic regression for the binary target variable
// Input:
// 		double **data : two dimensional array containing data
//				rows are for observations and columns are for variables
//				data[][0] is for weights
//				data[][1] is for a target variable.
//				Other columns are for explanatory variables.
//				(size=nrow*ncol)
//		long nrow : number of rows in data
//		long ncol : number of columns in data
//		long **info : two dimensional array containing variable information (size=ncol*2)
//			The first col is for variable type (1: continuous, 2: ordinal, 3: nominal)
//			The second col is for number of categories in each categorical variables. 
//			For the continuous variables, 0 is saved.
//		in method : model selection method option
//			1 : none
//			2 : forward selection
//			3 : stepwise selection
//			4 : backward elimination
//		double *cut : criterion for model selection
//			cut[0] : criterion for entry in forward and stepwise selection
//				If a variable not in the model has the smallest p-value less than this value, add the variable into the model 
//			cut[1] : criterion for entry in backward elimination and stepwise selection
//				If a variable in the model has the largest p-value greater than this value, eliminate the variable in the model
//	Output :
//		input *nin : number of variables in the model including intercept in the final model
//		double **parm : parameter estimates for each variables in the final model
//			1st col : variable id
//			2nd col : category number. For continuous varibles, 1 is saved
//			3rd col : parameter estimate
//			4th col : standard error for parameter estimate
//			5th col : Wald statictic
//			6th col : p-value for Wald statistic
//			7th col : odds ratio
//			8th col : lower limit for confidence interval for odds 
//			9th col : upper limit for confidence interval for odds 
//			Number of rows for parm is sum of number of continuous variables and number of catergories in each variables plus 1.
//		int *nparm0 : number of parameters
//		double **effect : effect of each variable in the final model
//			1st col : variable id
//			2nd col : degree of freedom 
//			3rd col : Wald statistic
//			4th col : p-value for Wald statistic
//		double *stat : statistics for the final model
//			1st col : degree of freedom
//			2nd col : -2*log-likelihood
//			3rd col : aic
//			4th col : sbc
//			5th col : log-likelihood ratio
//			6th col : p-value for log-likelihood ratio
//		double **step : variable status entering or eliminating in the model 
//			1st col : step #
//			2nd col : variable id removed
//			3rd col : degree of freedom
//			4th col : number of variables in the model after removing
//			5th col : Wald statistic
//			6th col : p-value for Wald statistic

//
// return value : error indicator
//		0 : no error
//		1 : reach maximum iteration reaches; may not converge
//		2 : variance matrix is not positive definite
//		10 : error - invalid target variable type
//		80 : error - memory allocation error
//
//****************************************************************************

// long model_logistic0(long **info, long method, double *cut, long *nin, double **parm0, long *nparm0, double **effect, double *stat, double **step) {
function model_logistic0(info, method, cut, nin, parm0, nparm0, effect, stat, step) {
/*
	long 
		nrow, 
		ncol,
		nparm,		// number of parameters including intercept 
		nx,		// number of explanatory variables including intercept 
		*locvar,	// location of each explanatory variables in *parm 
		*nparmx,	// number of parameters for each explanatory variables 
		ier,		// error indicator 
		i, j, k;	// index variables 
	double 
		*onerow,	// read one row 
		*parm,		// parameter estimates for all variables 
		*vparm,		// variance estimate of parameter for all variables 
		eps=1e-8;	// singularity condition 

	FILE *fp1;
//	locvar=(long *) malloc(sizeof(long)*nx);
//	nparmx=(long *) malloc(sizeof(long)*nx);
//	onerow=(double *) malloc(sizeof(double)*ncol);
//	parm=(double *) malloc(sizeof(double)*nparm);
//	vparm=(double *) malloc(sizeof(double)*nparm*(nparm+1)/2);
*/

	var  	i, j, k, nrow, ncol, nparm, nx, ier;
	var eps=1e-8;	// singularity condition 
	nrow=Nrows;
	ncol=Ncols;
	ier=0;
	/* memory allocation */
	nx=ncol-2;
        var locvar = new Array(nx);
        var nparmx = new Array(nx);
        var onerow = new Array(nx);

	/* obtain data form for analysis */
	/* for explanatory variables */
	nparm=1; /* for intercept */
	for (i=0; i<nx; i++) {
		locvar[i]=nparm;
		if (info[i+1][0]==1) nparmx[i]=1;
		else nparmx[i]=info[i+1][1]-1;
		nparm+=nparmx[i];
	}
        var parm  = new Array(nparm);
        var vparm = new Array(nparm*(nparm+1)/2);

	if (info[0][0]==1 || info[0][1]!=2) return 10;

	/* read data */
	fp1=fopen(mstrFilePath,"rt");
	for (i=0; i<nrow; i++) {
		for (j=0; j<ncol; j++) fscanf(fp1,"%lf",onerow+j);
		DATA[i][0]=onerow[0];	/* weight */
		DATA[i][1]=(int(onerow[1])==1) ? 1:0;	/* target */
		/* for expalantory variables */
		for (j=0; j<nx; j++) {
			if (info[j+1][0]==1) DATA[i][locvar[j]+1]=onerow[j+2];	/* for continuous explanatory variable */
			else {						
				/* for categorical explanatory variable */
				for (k=1; k<info[j+1][1]; k++) {
					if (onerow[j+2]==k) DATA[i][locvar[j]+k]=1;
					else DATA[i][locvar[j]+k]=0;
				}
			}
		}
	}
	fclose(fp1);


	if (method==2) 
		ier=forward_logistic(nrow, nx, parm, locvar, nparmx, 0, cut, nin, parm0, effect, stat, step);
	else if (method==3)
		ier=forward_logistic(nrow, nx, parm, locvar, nparmx, 1, cut, nin, parm0, effect, stat, step);
	else if (method==4)
		ier=backward_logistic(nrow, nx, parm, locvar, nparmx, 1, cut, nin, parm0, effect, stat, step);
	else 
		ier=backward_logistic(nrow, nx, parm, locvar, nparmx, 0, cut, nin, parm0, effect, stat, step);

	nparm0=nparm;

	return(ier);

}


//****************************************************************************
//
// purpose : foreward selection or stepwise regression in the logistic regression for the binary target variable
// Input:
//		long nobs : number of observations
//		long nx : number of explanatory variables
//		long *nparm : number of parameters in the full model (model with all explanatory variables) 
//				For output, *nparm contains numbe of parameters for the final model 
//		long *locvar : array for starting position of parameters for each explanatory variable in the full model (model with all variables)
//			(size=nx)
//		long *nparmx : array for number of parameters for each explanatory variables (size=nx)
//		long stepwise : indicator for stepwise regression
//				1 : backward elimination
//				0 : full model fitting
//		double *cut : criterion for model selection
//			cut[0] : criterion for entry in forward and stepwise selection
//				If a variable not in the model has the smallest p-value less than this value, add the variable into the model 
//			cut[1] : criterion for entry in backward elimination and stepwise selection
//				If a variable in the model has the largest p-value greater than this value, eliminate the variable in the model
//	Output :
//		input *ninout : number of variables in the model including intercept in the final model
//		double **parm : parameter estimates for each variables in the final model
//			1st col : variable id
//			2nd col : category number. For continuous varibles, 1 is saved
//			3rd col : parameter estimate
//			4th col : standard error for parameter estimate
//			5th col : Wald statictic
//			6th col : p-value for Wald statistic
//			7th col : odds ratio
//			8th col : lower limit for confidence interval for odds 
//			9th col : upper limit for confidence interval for odds 
//			Number of rows for parm is sum of number of continuous variables and number of catergories in each variables plus 1.
//		double **effect : effect of each variable in the final model
//			1st col : variable id
//			2nd col : degree of freedom 
//			3rd col : Wald statistic
//			4th col : p-value for Wald statistic
//		double *stat : statistics for the final model
//			1st col : degree of freedom
//			2nd col : -2*log-likelihood
//			3rd col : aic
//			4th col : sbc
//			5th col : log-likelihood ratio
//			6th col : p-value for log-likelihood ratio
//		double **step : variable status entering or eliminating in the model 
//			1st col : step #
//			2nd col : variable id removed
//			3rd col : degree of freedom
//			4th col : number of variables in the model after removing
//			5th col : Wald statistic
//			6th col : p-value for Wald statistic
//
// return value : error indicator
//		0 : no error
//		1 : reach maximum iteration reaches; may not converge
//		2 : variance matrix is not positive definite
//		80 : error - memory allocation error
//
//****************************************************************************

// long forward_logistic(long nobs, long nx, long *nparm, long *locvar, long *nparmx, long stepwise, double *cut, long *ninout, double **parm, double **effect, double *stat, double **step) {
function forward_logistic(nobs, nx, nparm, locvar, nparmx, stepwise, cut, ninout, parm, effect, stat, step) {
/*
	long 
		*ivar1,		// column location of xx associated with xvar. The front part is for variables in the model and the last part is for candidate variables 
		*itemp,		// temporary work space 
		*nparmx1,	// number of parameters for variables in the model associated with xin 
		nparm0,		// number of parameters in the full model (model with all variables) 
		nparm1,		// number of parameters in the model at each step 
		nin,		// number of explanatory variables in the model. 
		*xvar,		// explanatory variable id's. The first nin elements are for variables in the model and the next ncan elements are for candidate variables. 
		ncan,		// number of candidate variables 
		*locvar1,	// starting location or column of parameters for variables in xvar. The first element in xvar is locvar1[0] 
		ier,		// error indicator 
		istep,		// index for step 
		ican, iloc, i, j, k, ij, imin, imax;	/* index variables 

	;
	double 
		*score,		// scores for candidates 
		*pvalues,	// pvalues for scores 
		pvalue_max,
		s1,		// score 
		*parm1,		// parameter estimates in the model 
		*grad,		// gradient 
		*vparm1,	// variance of parameters in the model 
		*den,		// variance of parameters in the model 
		*phat,		// estimated probabilities for each observations 
		*a11,		// temporary work space for computing scores 
		*a22,
		**a12,
		loglik,		// log-likelihood in each step 
		wald,		// wald statistic 
		t,		// temporary varible 
		*temp,		// temporary work space 
		eps=1e-15;	// singularity condition 

	ivar1=(long *) malloc(sizeof(long)*(nparm0-1));
	itemp=(long *) malloc(sizeof(long)*k);
	xvar=(long *) malloc(sizeof(long)*nx);
	nparmx1=(long *) malloc(sizeof(long)*nx);
	locvar1=(long *) malloc(sizeof(long)*nx);
	score=(double *) malloc(sizeof(double)*nx);
	pvalues=(double *) malloc(sizeof(double)*nx);
	parm1=(double *) malloc(sizeof(double)*nparm0);
	grad=(double *) malloc(sizeof(double)*nparm0);
	vparm1=(double *) malloc(sizeof(double)*nparm0*(nparm0+1)/2);
	den=(double *) malloc(sizeof(double)*nparm0*(nparm0+1)/2);
	a11=(double *) malloc(sizeof(double)*nparm0*(nparm0+1)/2);
	a22=(double *) malloc(sizeof(double)*nparm0*(nparm0+1)/2);
	a12=(double **) malloc(sizeof(double *)*nparm0);
	for (j=0; j<nparm0; j++) {
		a12[j]=(double *) malloc(sizeof(double)*k);
	}
	phat=(double *) malloc(sizeof(double)*nobs);
	temp=(double *) malloc(sizeof(double)*nparm0);
*/
        var out = 0;
	var ivar1,itemp,nparmx1,nparm0,nparm1, nin, xvar, ncan;
	var locvar1,ier,istep;	// index for step 
	var ican, iloc, i, j, k, ij, imin, imax;	/* index variables 
	var score, pvalues, pvalue_max,
	var s1,parm1,grad,vparm1,den,phat,		// estimated probabilities for each observations 
        var loglik,wald,t,temp,		// temporary work space 
	var eps=1e-15;	// singularity condition 

	nparm0=nparm; 
	k=0; // maximum number of parameters for each variables
	for (i=0; i<nx; i++) if (nparmx[i]>k) k=nparmx[i];

	var ivar1=new Array(nparm0-1);
	var itemp=new Array(k);
	var xvar=new Array(nx);
	var nparmx1=new Array(nx);
	var locvar1=new Array(nx);
	var score=new Array(nx);
	var pvalues=new Array(nx);
	var parm1=new Array(nparm0);
	var grad=new Array(nparm0);
	var vparm1=new Array(nparm0*(nparm0+1)/2);
	var den=new Array(nparm0*(nparm0+1)/2);
	var a11=new Array(nparm0*(nparm0+1)/2);
	var a22=new Array(nparm0*(nparm0+1)/2);
	var a12=new Array(nparm0);
	for (j=0; j<nparm0; j++) {
	  var a12[j]=new Array(k);
	}
	var phat=new Array(nobs);
	var temp=new Array(nparm0);

	/* initialization */

	nparm1=1;
	nin=0;
	ncan=nx;	/* all explanatory variables are candidate variables */

	/* front part of ivar1 and locvar1 is for variables in the model and 
	back part of them is for candidate variables. In the beginning, all variables
	are candidate variables, and all variables in xvar are candidates */
	for (i=0; i<nx; i++) {
		xvar[i]=i+1;
		locvar1[i]=locvar[i];
		nparmx1[i]=nparmx[i];
	}
	for (i=0; i<nparm0-1; i++) ivar1[i]=i+2; /* use all variables or all columns */

	/* initial model; model with an intercept only */
	ier=fit_logistic2(nobs, nparm1-1, ivar1, parm1, vparm1, loglik, s1);

	istep=0;
	while (1) {

		istep++;

		if (ncan==0) break;

		/* obtain estimated probabilities for each observations in the current model */
		compute_prob(nobs, nparm1-1, ivar1, parm1, phat);
		/* compute gradient for all variables under the current model */
		compute_grad(phat, nobs, nparm0-1, ivar1, grad); 
		/* compute X'WX for all variables under the current model */
		compute_den(phat, nobs, nparm0-1, ivar1, 0, den);

		/* obtain a11 and its inverse */
		for (ij=0; ij<nparm1*(nparm1+1)/2; ij++) a11[ij]=den[ij];
		ier=gsweep(a11, nparm1, temp, eps);

		for (ican=0; ican<ncan; ican++) {
			/*	compute score statistic for i-th candidate */
			/* When A is for variables in the model, B is for candidate variables, 
				C is for cross between variables in the model and candidates
				B-C'*inv(A)*C. inv(A) is saved in a11. */
			/* compute a12=inv(A)*C */
			/* locations of ican variable in ivar are from iloc=locvar1[nin+ican] to iloc+nparmx1[nin+ican]-1 */
			iloc=locvar1[nin+ican];
			for (i=0; i<nparm1; i++) {
				for (j=0; j<nparmx1[nin+ican]; j++) {
					a12[i][j]=0;
					for (k=0; k<nparm1; k++) a12[i][j]+=a11[indxs(i,k)]*den[indxs(k,iloc+j)];
				}
			}
			/* compute B-C'*inv(A)*C=B-C'*a12 */
			for (i=0, ij=0; i<nparmx1[nin+ican]; i++) {
				for (j=0; j<=i; j++, ij++) {
					a22[ij]=den[indxs(locvar1[nin+ican]+i,locvar1[nin+ican]+j)];
					for (k=0; k<nparm1; k++) a22[ij] -= den[indxs(iloc+i,k)]*a12[k][j];
				}
			}
			/* compute inv(B-C'*inv(A)*C) */
			ier=gsweep(a22, nparmx1[nin+ican], temp, eps);
			/* compute score */
			score[ican]=0;
			for (i=0; i<nparmx1[nin+ican]; i++) {
				t=0; 
				for (j=0; j<nparmx1[nin+ican]; j++) t+= a22[indxs(i,j)]*grad[iloc+j];
				score[ican]+=grad[iloc+i]*t;
			}
			pvalues[ican]=1-cdfchi2(score[ican], nparmx1[nin+ican],i);
		}

		/* find a candidate variable with minimum pvalue */
		t=1;
// fprintf(fp1,"score & p-values\n");

		for (ican=0; ican<ncan; ican++) {

// fprintf(fp1,"%d  %10.5f  %7.5f\n",xvar[nin+ican],score[ican],pvalues[ican]);

			if (pvalues[ican]<t) {
				imin=ican;
				t=pvalues[ican];
			}
		}
// fprintf(fp1,"\n\n");
		if (pvalues[imin]>cut[0]) break;

		/* add xvar[nin+imin] into the model */

		/* update step */
		step[istep-1][0]=istep;			/* step # */
		step[istep-1][1]=xvar[nin+imin];	/* variable id added */
		step[istep-1][2]=nparmx1[nin+imin];	/* degree of freedom */
		step[istep-1][3]=nin+1;			/* number of variables in the model */
		step[istep-1][6]=score[imin];		/* score statistic */
		step[istep-1][7]=pvalues[imin];		/* p-value for score statistic */


		/* update ivar1 */
		for (i=0; i<nparmx1[nin+imin]; i++) {
			itemp[i]=ivar1[locvar1[nin+imin]+i-1];
		}
		for (i=locvar1[nin+imin]+nparmx1[nin+imin]-2; i>=locvar1[nin]+nparmx1[nin+imin]-1; i--) {
			ivar1[i]=ivar1[i-nparmx1[nin+imin]];
		}
		for (i=locvar1[nin]-1, j=0; i<locvar1[nin]+nparmx1[nin+imin]-1; i++, j++) {
			ivar1[i]=itemp[j];
		}

		/* add xvar[nin+imin] into nin */

		/* update xvar */
		j=xvar[nin+imin];
		for (i=nin+imin; i>nin; i--) xvar[i]=xvar[i-1];
		xvar[nin]=j;

		/* update nparmx1 */
		j=nparmx1[nin+imin];
		for (i=nin+imin; i>nin; i--) nparmx1[i]=nparmx1[i-1];
		nparmx1[nin]=j;

		/* update locvar1 */
		for (i=nin+1; i<=nin+imin; i++) {
			locvar1[i]=locvar1[i-1]+nparmx1[i-1];
		}

		/* update number of parameters */
		nparm1+=nparmx1[nin];

		/* update number of variables in the model */
		imin=nin;
		nin++;
		ncan--;

		/* initial model; model with an intercept only */
		ier=fit_logistic2(nobs, nparm1-1, ivar1, parm1, vparm1, loglik, s1);

		/* compute wald staticstic for the variable added */
		for (i=0, ij=0; i<nparmx1[imin]; i++) {
			for (j=0; j<=i; j++, ij++) {
				den[ij]=vparm1[indxs(locvar1[imin]+i,locvar1[imin]+j)];
			}
		}
		ier=gsweep(den, nparmx1[imin], temp, eps);

		wald=0.;
		for (i=0; i<nparmx1[imin]; i++) {
			t=0.;
			for (j=0; j<nparmx1[imin]; j++) {
				t += den[indxs(i,j)]*parm1[locvar1[imin]+j];
			}
			wald += parm1[locvar1[imin]+i]*t;
		}

		step[istep-1][4]=wald;		/* Wald statistic for the variable to add */
		step[istep-1][5]=1-cdfchi2(wald, nparmx1[imin],i);		/* p-value for Wald statistic */


		/* only for stepwise; delete variables whose p-value for Wald statistic is greater than cut[1] */
		if (stepwise) while(1) {	

			/* obtain p-value for explanatory variables */
			ier=find_deletion(parm1, vparm1, den, nin, nparmx1, locvar1, xvar, temp, eps, effect, imax, pvalue_max);

			if (pvalue_max<cut[1]) break;

			istep++;

			/* update step */
			step[istep-1][0]=istep;			/* step # */
			step[istep-1][1]=xvar[imax];		/* variable id removed */
			step[istep-1][2]=nparmx1[imax];		/* degree of freedom */
			step[istep-1][3]=nin-1;			/* number of variables in the model */
			step[istep-1][4]=effect[imax][2];	/* Wald statistic for the variable to remove */
			step[istep-1][5]=pvalue_max;		/* p-value for Wald statistic */
			step[istep-1][6]=s1;			/* score statistic */
			step[istep-1][7]=1-cdfchi2(s1, nparm1-1,i);	/* p-value for score statistic */

			/* imax variable is eliminated in the model */

			/* update ivar, locvar1, nparmx1, xvar */

			/* update ivar1 */
			for (i=0; i<nparmx1[imax]; i++) {
				itemp[i]=ivar1[locvar1[imax]-1+i];
			}
			for (i=locvar1[imax]-1; i<nparm1-1-nparmx1[imax]; i++) {
				ivar1[i]=ivar1[i+nparmx1[imax]];
			}
			for (j=0; i<nparm1-1; i++, j++) {
				ivar1[i]=itemp[j];
			}

			/* update nparmx1 */
			j=nparmx1[imax];
			for (i=imax; i<nin-1; i++) nparmx1[i]=nparmx1[i+1];
			nparmx1[nin-1]=j;

			/* update locvar1 */
			for (i=imax+1; i<nin; i++) {
				locvar1[i]=locvar1[i-1]+nparmx1[i-1];
			}

			/* update xvar */
			j=xvar[imax];
			for (i=imax; i<nin-1; i++) xvar[i]=xvar[i+1];
			xvar[nin-1]=j;

			/* update number of parameters */
			nparm1-=nparmx1[nin-1];

			/* update number of variables in the model */
			nin--;
			ncan++;

			/* update the model */
			ier=fit_logistic2(nobs, nparm1-1, ivar1, parm1, vparm1, loglik, s1);

			/* if a variable is add in the previous step and deleted in this step, stop looping to prevent infinite looping */
			if (step[istep-1][1]==step[istep-2][1]) {istep++; out=0; break;}

		}	/* end of deletion; all variables in the model have p-value less than cut[1] */
		
	}

    if (out==1) {
	step[istep-1][0]=-1;

	/* save the final result */

	/* obtain effects for each variables */
	ier=find_deletion(parm1, vparm1, den, nin, nparmx1, locvar1, xvar, temp, eps, effect, imax, pvalue_max);


	/* parameter estimate */

	/* for intercept */
	parm[0][0]=0;					// variable id
	parm[0][1]=1;					// category number. For continuous varibles, 1 is saved
	parm[0][2]=parm1[0];				// parameter estimate
	parm[0][3]=sqrt(vparm1[0]);			//  standard error for parameter estimate
	parm[0][4]=parm1[0]*parm1[0]/vparm1[0];		// Wald statictic
	parm[0][5]=1-cdfchi2(parm[0][4], 1, i);	// p-value for Wald statistic
	parm[0][6]=parm[0][7]=parm[0][8]=0;

	ij=1;
	for (k=0; k<nin; k++) {
		for (j=0; j<nparmx1[k]; j++, ij++) {
			parm[ij][0]=xvar[k];							// variable id
			parm[ij][1]=j+1;								// category number. For continuous varibles, 1 is saved
			parm[ij][2]=parm1[locvar1[k]+j];					// parameter estimate
			parm[ij][3]=sqrt(vparm1[indxs(locvar1[k]+j,locvar1[k]+j)]);					// standard error for parameter estimate
			parm[ij][4]=parm[ij][2]*parm[ij][2]/vparm1[indxs(locvar1[k]+j,locvar1[k]+j)];		// Wald statictic
			parm[ij][5]=1-cdfchi2(parm[ij][4], 1, i);		// p-value for Wald statistic
			parm[ij][6]=Math.exp(parm[ij][2]);					// odds ratio
			parm[ij][7]=Math.exp(parm[ij][2]-1.96*parm[ij][3]);	// lower limit for odds ratio
			parm[ij][8]=Math.exp(parm[ij][2]+1.96*parm[ij][3]);	// upper limit for odds ratio
		}
	}

	/* save statistics for the final model */

	stat[0]=nparm1-1;			// degree of freedom
	stat[1]=-2*loglik;			// -2*log-likelihood
	stat[2]=stat[1]+2*nparm1;	// aic
//	for (i=0, t=0; i<nobs; i++) t+=wt[i];
//	stat[3]=stat[1]+nparm1*Math.log(t);	// sbc
	stat[3]=stat[1]+nparm1*Math.log(nobs);	// sbc
	ier=fit_logistic2(nobs, 0, ivar1, parm1, vparm1, t, temp);  // compute log-likelihood for the model with intercept only
	stat[4]=-2*t-stat[1];		// log-likelihood ratio test statistic
	stat[5]=1-cdfchi2(stat[4], stat[0],i);		// p-value for log-likelihood ratio
	/* compute Wald statistics */
	for (i=1, ij=0; i<nparm1; i++) {
		for (j=1; j<=i; j++, ij++) {
			a11[ij]=vparm1[indxs(i,j)];
		}
	}
	ier=gsweep(a11, nparm1-1, temp, eps);
	stat[6]=0.;
	for (i=1; i<nparm1; i++) {
		t=0.;
		for (j=1; j<nparm1; j++) {
			t += a11[indxs(i-1,j-1)]*parm1[j];
		}
		stat[6] += parm1[i]*t;
	}
	stat[7]=1-cdfchi2(stat[6], nparm1-1,i);
	/* compute score statistic */
	stat[8]=s1;
	stat[9]=1-cdfchi2(s1, nparm1-1,i);

	ninout=nin;
	nparm=nparm1;

	return(0);

    } // endof out
}	/* end of forward */


//****************************************************************************
//
// purpose : backward elimination in the logistic regression for the binary target variable
// Input:
//		long nobs : number of observations
//		long nx : number of explanatory variables
//		long *nparm : number of parameters in the full model (model with all explanatory variables) 
//				For output, *nparm contains numbe of parameters for the final model 
//		long *locvar : array for starting position of parameters for each explanatory variable in the full model (model with all variables)
//			(size=nx)
//		long *nparmx : array for number of parameters for each explanatory variables (size=nx)
//		long backward : indicator for backward elimination method
//				1 : backward elimination
//				0 : full model fitting
//		double *cut : criterion for model selection
//			cut[0] : criterion for entry in forward and stepwise selection
//				If a variable not in the model has the smallest p-value less than this value, add the variable into the model 
//			cut[1] : criterion for entry in backward elimination and stepwise selection
//				If a variable in the model has the largest p-value greater than this value, eliminate the variable in the model
//	Output :
//		input *ninout : number of variables in the model including intercept in the final model
//		double **parm : parameter estimates for each variables in the final model
//			1st col : variable id
//			2nd col : category number. For continuous varibles, 1 is saved
//			3rd col : parameter estimate
//			4th col : standard error for parameter estimate
//			5th col : Wald statictic
//			6th col : p-value for Wald statistic
//			7th col : odds ratio
//			8th col : lower limit for confidence interval for odds 
//			9th col : upper limit for confidence interval for odds 
//			Number of rows for parm is sum of number of continuous variables and number of catergories in each variables plus 1.
//		double **effect : effect of each variable in the final model
//			1st col : variable id
//			2nd col : degree of freedom 
//			3rd col : Wald statistic
//			4th col : p-value for Wald statistic
//		double *stat : statistics for the final model
//			1st col : degree of freedom
//			2nd col : -2*log-likelihood
//			3rd col : aic
//			4th col : sbc
//			5th col : log-likelihood ratio
//			6th col : p-value for log-likelihood ratio
//		double **step : variable status entering or eliminating in the model 
//			1st col : step #
//			2nd col : variable id removed
//			3rd col : degree of freedom
//			4th col : number of variables in the model after removing
//			5th col : Wald statistic
//			6th col : p-value for Wald statistic
//
// return value : error indicator
//		0 : no error
//		1 : reach maximum iteration reaches; may not converge
//		2 : variance matrix is not positive definite
//		80 : error - memory allocation error
//
//****************************************************************************

// long backward_logistic(long nobs, long nx, long *nparm, long *locvar, long *nparmx, long backward, double *cut, long *ninout, double **parm, double **effect, double *stat, double **step) {
function backward_logistic(nobs, nx, nparm, locvar, nparmx, backward, cut, ninout, parm, effect, stat, step) {
/*
	long 
		nparm1,		// number of parameters in the model, which is sum of nparmx plus one (for intercept) 
		nin,		// number of explanatory variables in the model. 
		*xin,		// explanatory variable id's in the model. The id for the first variable is 1. 
		*nparmx1,	// number of parameters for variables associated with xvar 
		*locvar1,	// starting location or column of parameters in parm1 for each variables 
		*ivar1,		// column for each parameter to use or in the model in x 
		ier,		// error indicator 
		istep,		// index for step 
		i, j, k, ij, imax;// index variables 

	double 
		*parm1,		// parameter estimates in the model 
		*vparm1,	// variance of parameters in the model 
		*vparm2,	// temporary varialbe for vparm1 
		loglik,		// log-likelihood in each step 
		score,		// score statistic 
		pvalue_max,	// maximum p-value in the model 
		t,		// temporary varible 
		*temp,		// temporary work space 
		eps=1e-15;	// singularity condition 

	nparmx1=(long *) malloc(sizeof(long)*nx);
	if (nparmx1==NULL) return(80);
	xin=(long *) malloc(sizeof(long)*nx);
	if (xin==NULL) return(80);
	locvar1=(long *) malloc(sizeof(long)*nx);
	if (locvar1==NULL) return(80);
	parm1=(double *) malloc(sizeof(double)*nparm1);
	if (parm1==NULL) return(80);
	ivar1=(long *) malloc(sizeof(long)*(nparm1-1));
	if (ivar1==NULL) return(80);
	vparm1=(double *) malloc(sizeof(double)*nparm1*(nparm1+1)/2);
	if (vparm1==NULL) return(80);
	vparm2=(double *) malloc(sizeof(double)*nparm1*(nparm1+1)/2);
	if (vparm2==NULL) return(80);
	temp=(double *) malloc(sizeof(double)*nparm1);
	if (temp==NULL) return(80);
*/

	var nparm1,nin,xin,nparmx1,locvar1,ivar1,ier,istep;
	var i, j, k, ij, imax;	/* index variables 
        var loglik;	/* log-likelihood in each step */
	var score;	/* score statistic */
	var pvalue_max;	/* maximum p-value in the model */
	var t;		/* temporary varible */
	var eps=1e-15;	/* singularity condition */

	ier=0;
	nin=nx;
	nparm1=nparm;

	/* memory allocation */

	var nparmx1=new Array(nx);
	var xin=new Array(nx);
	var locvar1=new Array(nx);
	var parm1=new Array(nparm1);
	var ivar1=new Array(nparm1-1);
	var vparm1=new Array(nparm1*(nparm1+1)/2);
	var vparm2=new Array(nparm1*(nparm1+1)/2);
	var temp=new Array(nparm1);

	/* initialization */
	for (i=0; i<nin; i++) {
		xin[i]=i+1;
		locvar1[i]=locvar[i];
		nparmx1[i]=nparmx[i];
	}
	for (i=0; i<nparm1-1; i++) ivar1[i]=i+2; /* use all variables or all columns */

	ier=fit_logistic2(nobs, nparm1-1, ivar1, parm1, vparm1, loglik, score);

	istep=0;

	/* untile every explanatory variable in the model has p-value less than cut[1] */
	while(1) {	

		istep++;

		/* obtain p-value for explanatory variables */
		ier=find_deletion(parm1, vparm1, vparm2, nin, nparmx1, locvar1, xin, temp, eps, effect, imax, pvalue_max);


		if (backward==0 || pvalue_max<cut[1]) break;

		/* update step */
		step[istep-1][0]=istep;				/* step # */
		step[istep-1][1]=xin[imax];			/* variable id removed */
		step[istep-1][2]=nparmx1[imax];		/* degree of freedom */
		step[istep-1][3]=nin-1;				/* number of variables in the model */
		step[istep-1][4]=effect[imax][2];	/* Wald statistic for the variable to remove */
		step[istep-1][5]=pvalue_max;		/* p-value for Wald statistic */
		step[istep-1][6]=score;				/* score statistic */
		step[istep-1][7]=1-cdfchi2(score, nparm1-1,i);				/* p-value for score statistic */

		/* imax variable is eliminated in the model */

		nparm1 -= nparmx1[imax];
		for (i=locvar1[imax]; i<nparm1; i++) ivar1[i-1]=ivar1[i+nparmx1[imax]-1];
		nin--;
		for (i=imax; i<nin; i++) {
			xin[i]=xin[i+1];
			if (i>imax) locvar1[i]=locvar1[i-1]+nparmx1[i-1];
			nparmx1[i]=nparmx1[i+1];
		}

		/* for new variables in the model */
		ier=fit_logistic2(nobs, nparm1-1, ivar1, parm1, vparm1, loglik, score);

	}	/* end of loop; all variables in the model have p-value less than cut[1] */

	/* save the final result */

	step[istep-1][0]=-1;

	/* parameter estimate */

	/* for intercept */
	parm[0][0]=0;					// variable id
	parm[0][1]=1;					// category number. For continuous varibles, 1 is saved
	parm[0][2]=parm1[0];				// parameter estimate
	parm[0][3]=sqrt(vparm1[0]);			//  standard error for parameter estimate
	parm[0][4]=parm1[0]*parm1[0]/vparm1[0];		// Wald statictic
	parm[0][5]=1-cdfchi2(parm[0][4], 1, i);		// p-value for Wald statistic
	parm[0][6]=parm[0][7]=parm[0][8]=0;

	ij=1;
	for (k=0; k<nin; k++) {
		for (j=0; j<nparmx1[k]; j++, ij++) {
			parm[ij][0]=xin[k];			// variable id
			parm[ij][1]=j+1;			// category number. For continuous varibles, 1 is saved
			parm[ij][2]=parm1[locvar1[k]+j];	// parameter estimate
			parm[ij][3]=sqrt(vparm1[indxs(locvar1[k]+j,locvar1[k]+j)]);					// standard error for parameter estimate
			parm[ij][4]=parm[ij][2]*parm[ij][2]/vparm1[indxs(locvar1[k]+j,locvar1[k]+j)];	// Wald statictic
			parm[ij][5]=1-cdfchi2(parm[ij][4], 1, i);	// p-value for Wald statistic
			parm[ij][6]=Math.exp(parm[ij][2]);			// odds ratio
			parm[ij][7]=Math.exp(parm[ij][2]-1.96*parm[ij][3]);	// lower limit for odds ratio
			parm[ij][8]=Math.exp(parm[ij][2]+1.96*parm[ij][3]);	// upper limit for odds ratio
		}
	}

	/* save statistics for the final model */

	stat[0]=nparm1-1;			// degree of freedom
	stat[1]=-2*loglik;			// -2*log-likelihood
	stat[2]=stat[1]+2*nparm1;	// aic
	for (i=0, t=0; i<nobs; i++) t+=DATA[i][0];
//	stat[3]=stat[1]+nparm1*Math.log(t);	// sbc
	stat[3]=stat[1]+nparm1*Math.log(nobs);	// sbc
	ier=fit_logistic2(nobs, 0, ivar1, parm1, vparm1, t, temp);  // compute log-likelihood for the model with intercept only
	stat[4]=-2*t-stat[1];		// log-likelihood ratio test statistic
	stat[5]=1-cdfchi2(stat[4], stat[0],i);		// p-value for log-likelihood ratio
	/* compute Wald statistics */
	for (i=1, ij=0; i<nparm1; i++) {
		for (j=1; j<=i; j++, ij++) {
			vparm2[ij]=vparm1[indxs(i,j)];
		}
	}
	ier=gsweep(vparm2, nparm1-1, temp, eps);
	stat[6]=0.;
	for (i=1; i<nparm1; i++) {
		t=0.;
		for (j=1; j<nparm1; j++) {
			t += vparm2[indxs(i-1,j-1)]*parm1[j];
		}
		stat[6] += parm1[i]*t;
	}
	stat[7]=1-cdfchi2(stat[6], nparm1-1,i);
	/* compute score statistic */
	stat[8]=score;
	stat[9]=1-cdfchi2(score, nparm1-1,i);

	ninout=nin;
	nparm=nparm1;

	return(0);
	
}	/* end of backward */


/*
Purpose : find a variables to delete in the model
Input
	double *parm1 : array for parameter estimates (size=sum of nparmx1)
	double *vparm1 : variance for parm1 (size=(sum of nparmx1)*(sum of nparmx1 + 1)/2)
			Lower triangular part of variance matrix is saved row-wisely
	double *vparm2 : working space for vparm1 (size=same as that of vparm1)
	long nin : number of explanatory variables in the model
	long *nparmx1 : numbr of parameters for each explanatory variable (size=nin)
	long *locvar1 : location of the starting position of paramters for each explanatory variable in parm1 (size=nx)
	long *xin : variable id for the explanatory variables in the model (size=nx)
	double *temp : temporary working space (size=number of parameters)
	double eps : error bound
Output
	double **effect : effect of each explanatory variable in the model
		1st col : variable id
		2nd col : degree of freedom 
		3rd col : Wald statistic
		4th col : p-value for Wald statistic 
	long *imax : indicator for variable to delete
	double *pvalue_max : pvalue for deletion
return value :
	0 : normal termination
	1 : vparm1 is not positive definite
*/

// long find_deletion(double *parm1, double *vparm1, double *vparm2, long nin, long *nparmx1, long *locvar1, long *xin, double *temp, double eps, double **effect, long *imax, double *pvalue_max) {
function find_deletion(parm1, vparm1, vparm2, nin, nparmx1, locvar1, xin, temp, eps, effect, imax, pvalue_max) {

		var k, i, j, ij, ier;
		var pvaluew, wald, t;

		pvalue_max=-1;

		for (k=0; k<nin; k++) {

			/* copy variance for the k-th variable in xin */
			for (i=0, ij=0; i<nparmx1[k]; i++) {
				for (j=0; j<=i; j++, ij++) {
					vparm2[ij]=vparm1[indxs(locvar1[k]+i,locvar1[k]+j)];
				}
			}
			ier=gsweep(vparm2, nparmx1[k], temp, eps);

			wald=0.;
			for (i=0; i<nparmx1[k]; i++) {
				t=0.;
				for (j=0; j<nparmx1[k]; j++) {
					t += vparm2[indxs(i,j)]*parm1[locvar1[k]+j];
				}
				wald += parm1[locvar1[k]+i]*t;
			}
			
			pvaluew=1-cdfchi2(wald, nparmx1[k],i);

			/* save type 3 or partial effect for each varaible */
			effect[k][0]=xin[k];		// variable id
			effect[k][1]=nparmx1[k];	// degree of freedom 
			effect[k][2]=wald;			// Wald statistic
			effect[k][3]=pvaluew;		// p-value for Wald statistic

			if (pvaluew>pvalue_max) {
				pvalue_max=pvaluew;
				imax=k;
			}

		}
		return ier;
}


/*
purpose : obtain estimates in the logistic regression
input :
	long nobs : number of observations
	long nvar : number of input variables
	long *ivar : array for locations of explanatory variables (size=nvar)
output :
	double *beta : estimates of parameters (size=nvar+1)
	double *vbeta : variance matrix of beta (size=(nvar+1)*(nvar+2)/2)
	double *loglik : log-likelihood of the model
	double *score : score statistic
return value :
	0 : normal 
	1 : reach maximum iteration reaches; may not converge
	2 : variance matrix is not positive definite
*/
// long fit_logistic2(long nobs, long nvar, long *ivar1, double *beta, double *vbeta, double *loglik, double *score)
function fit_logistic2(nobs, nvar, ivar1, beta, vbeta, loglik, score)
{
/*
	long    i, j, 		// index variable 
		   imethod=2, 	// use Newton-Raphson method 
		   idenom, 	// indicator for singularity of denominator 
		   nparm, 	// number of parameters 
		   iter, 	// index variable for iteration 
		   maxiter=1000; // maximum number of iteration 
	double 
		   sumwt, // sum of weights 
		   *phat, // pointer for estimated probability 
		   *grad, // pointer for gradient 
		   *dir, // pointer for direction vector 
		   *temp, // pointer for temporary working space of size nparm 
		   *oldbeta, // pointer for estimates in the previous step 
		   old_loglik, // log-likelihood in the previous step 
		   step, // step size 
		   relerr, // relative error 
		   abserr, // absolute error 
		   gerr,
		   lambda=0.001, // constant for Marquadt method 
		   epsilon=1e-10, // error bound for zero 
		   nu=1e-8; // error bound for iteration 
		   

	nparm=nvar+1; // add one due to intercept 

	// memory allocation 

	phat=(double *) malloc(sizeof(double)*nobs);     // estimated probability 
	grad=(double *) malloc(sizeof(double)*nparm);    // gradient 
	dir=(double *) malloc(sizeof(double)*nparm);     // direction vector 
	temp=(double *) malloc(sizeof(double)*nparm);    // temporary working space 
	oldbeta=(double *) malloc(sizeof(double)*nparm); // estimates in the previous step 
*/

	var   i, j; /* index variable */
	var   imethod=2; /* use Newton-Raphson method */
	var   idenom; /* indicator for singularity of denominator */
	var   nparm; /* number of parameters */
	var   iter; /* index variable for iteration */
	var   maxiter=1000; /* maximum number of iteration */
	var   sumwt; /* sum of weights */
	var   old_loglik; /* log-likelihood in the previous step */
	var   step; /* step size */
	var   relerr; /* relative error */
	var   abserr; /* absolute error */
	var   gerr;
	var   lambda=0.001; /* constant for Marquadt method */
	var   epsilon=1e-10; /* error bound for zero */
	var   nu=1e-8; /* error bound for iteration */	   

	nparm=nvar+1; /* add one due to intercept */

	var phat=new Array(nobs);     /* estimated probability */
	var grad=new Array(nparm);    /* gradient */
	var dir=new Array(nparm);     /* direction vector */
	var temp=new Array(nparm);    /* temporary working space */
	var oldbeta=new Array(nparm); /* estimates in the previous step */

	/* initialization */
	
	/* intercept is given to be an unconditional probability */
	beta[0]=sumwt=0;
	for (i=0; i<nobs; i++) {
		beta[0]+=DATA[i][0]*DATA[i][1];
		sumwt+=DATA[i][0];
	}
	beta[0] /= sumwt;

	if (beta[0]<0.0000001 || beta[0]>0.9999999) beta[0]=0.;
	else beta[0]=Math.log(beta[0]/(1-beta[0]));
	/* other parameters is set to zero */
	for (j=1; j<=nvar; j++) beta[j]=0.;


	/* obtain log-likelihood for initial values */
	/* obtain new estimated probability */
	compute_prob(nobs, nvar, ivar1, beta, phat);
	/* obtain log-likelihood */
	loglik=compute_loglik(phat, nobs);

	/* compute score statistic */
	compute_grad(phat, nobs, nvar, ivar1, grad); 
	compute_den(phat, nobs, nvar, ivar1, 0, vbeta);
	idenom=compute_beta(vbeta, grad, dir, temp, nparm, epsilon);
	score=0.;
	for (i=1; i<=nvar; i++) score += grad[i]*dir[i];

	/* initialization of relative and absolute errors */
	relerr=abserr=nu+10;

	iter=0;

	/* for test */
// fprintf(fp1,"iter=%d -2*log-likelihood=%15.10f\n",iter,-2* *loglik);
// for (j=0; j<nparm; j++) fprintf(fp1,"%f\n",beta[j]);
// fprintf(fp1,"\n");

	if (nvar==0) iter=maxiter+1;

	/* beginning of iteration */
	while ( 1 ) {
		
		iter++;

		if (imethod==1) {
			/* for steepest descent method; use gradient for direction */
			for (i=0; i<nparm; i++) dir[i]=grad[i];
		}
		else {
			/* For Newton-Raphson method */
			/* obtain denominater X'*W*X */
			compute_den(phat, nobs, nvar, ivar1, lambda, vbeta);
			/* obtain step direction inv(X'*W*X)*gradient */
			idenom=compute_beta(vbeta, grad, dir, temp, nparm, epsilon);
		}

		/* add modulte for step size */
		step_size(nobs, nvar, ivar1, beta, dir, loglik, phat, step);
//		step=1;
		if (step<1e-10) break;

		/* save old one before update */
		for (j=0; j<nparm; j++) oldbeta[j]=beta[j];
		old_loglik=loglik;

		/* compute new estimate */
		for (j=0; j<nparm; j++) beta[j]=oldbeta[j]+step*dir[j];

		/* compute log-likelihood for new estimate */
		/* obtain new estimated probability */
		compute_prob(nobs, nvar, ivar1, beta, phat);
		/* obtain log-likelihood */
		loglik=compute_loglik(phat, nobs);

		/* compute errors */
		abserr=loglik-old_loglik;
		relerr=abserr/ABS(old_loglik);
		gerr=0;
		for (j=0; j<nparm; j++) gerr+=grad[j]*dir[j];
		gerr/=(Math.abs(loglik)+1e-8);
		
		if (iter>=maxiter || (relerr < nu && abserr < nu)) break;

//		if (iter>=maxiter || gerr<nu) break;

		/* obtain gradient; (Y-PHAT)'*X */
		compute_grad(phat, nobs, nvar, ivar1, grad); 

		/* for test */
// fprintf(fp1,"iter=%d -2*log-likelihood=%15.10f\n",iter,-2* *loglik);
// for (j=0; j<nparm; j++) fprintf(fp1,"%f\n",beta[j]);
// fprintf(fp1,"\n");

	}
	/* end of iteration */

	/* if log-likelihood is not improved in the last step, keep the old one */
	if (abserr<0) {
		loglik=old_loglik;
		for (j=0; j<nparm; j++) beta[j]=oldbeta[j];
	}

	/* compute variance of the final estimates */
	compute_prob(nobs, nvar, ivar1, beta, phat);
	compute_den(phat, nobs, nvar, ivar1, 0., vbeta);
	idenom=gsweep(vbeta, nparm, oldbeta, epsilon);
	
	/* check whether iteration stops due to limitation of iteration; in this case, 
	estimates may not converge */
	if (iter==maxiter && ((relerr > nu || abserr > nu))) return(1);
	else if (idenom) return(2);
	else return(0);
}


/* purpose : obtain step size using golden section method
input :
	long nobs : number of observations
	long nvar : number of input variables
	long *ivar : array for locations of explanatory variables (size=nvar)
	double *beta : estimates of parameters
	double *dir : direction vector
	double loglik : log-likelihood of the model
	double *phat : working space for probability; will be changed
output :
	double *step : step size
*/
// void step_size(long nobs, long nvar, long *ivar1, double *beta, double *dir, double loglik, double *phat, double *step)
function step_size(nobs, nvar, ivar1, beta, dir, loglik, phat, step)
{
/*
	double tau=0.5, // increment for initial interval 
		   *new_beta, // pointer for new direction 
		   l1, // log-likelihood in the left point of inner points 
		   l2, // log-likelihood in the right point of inner points 
		   a1, // left side point in interval with maximum 
		   a2, // right side point in interval with maximum 
		   b1, // left point of inner points 
		   b2, // right point of inner points 
		   v1, // rate for left inner point 
		   v2, // reate for right inner point; golden section rate 
		   nu=1.e-3; /* error bound for step size 
	long i, // index variable    
		iter,  // index for iteration 
		nparm; // number of parameters 

	/* allocate memory for new direction 
//	new_beta=(double *)malloc(sizeof(double)*nparm);
*/


	var   tau=0.5; /* increment for initial interval */
	var   l1; /* log-likelihood in the left point of inner points */
	var   l2; /* log-likelihood in the right point of inner points */
	var   a1; /* left side point in interval with maximum */
	var   a2; /* right side point in interval with maximum */
	var   b1; /* left point of inner points */
	var   b2; /* right point of inner points */
	var   v1; /* rate for left inner point */
	var   v2; /* reate for right inner point; golden section rate */
	var   nu=1.e-3; /* error bound for step size */
	var   i; /* index variable */   
	var   iter;  /* index for iteration */
	var   nparm; /* number of parameters */

	nparm=nvar+1;
 	var new_beta=new Array(nparm);

	/* find interval containing maximum */
	iter=0;
	l2=loglik;
	l1=l2-10;
	a2=0;
	while (iter<100 && (l1<l2) ) {
		iter++;
		a2 += tau;
		l1=l2;

		/* compute log-likelihood for new estimate */
		/* obtain new estimated probability */
		for (i=0; i<nparm; i++) new_beta[i]=beta[i]+a2*dir[i];
		compute_prob(nobs, nvar, ivar1, new_beta, phat);
		/* obtain log-likelihood */
		l2=compute_loglik(phat, nobs);

	}
	if (iter==100 && (l2<l1)) {
		step=0.;
		return;
	}
	/* maximum is in [a1,a2] */
	else if (iter==1) a1=0;
	else {
		a1=(iter-2)*tau;
	}

	v1=(3.-sqrt(5))/2.;
	v2=1-v1;
	
	/* two internal point is b1 and b2 */
	/* for b1 */
	b1=a1+(a2-a1)*v1;
	/* compute log-likelihood for b1 */
	for (i=0; i<nparm; i++) new_beta[i]=beta[i]+b1*dir[i];
	/* obtain new estimated probability */
	compute_prob(nobs, nvar, ivar1, new_beta, phat);
	/* obtain log-likelihood */
	l1=compute_loglik(phat, nobs);
	/* for b2 */
	b2=a1+(a2-a1)*v2;
	/* compute log-likelihood for b1 */
	for (i=0; i<nparm; i++) new_beta[i]=beta[i]+b2*dir[i];
	/* obtain new estimated probability */
	compute_prob(nobs, nvar, ivar1, new_beta, phat);
	/* obtain log-likelihood */
	l2=compute_loglik(phat, nobs);

	iter=0;

	while ( a2-a1>nu ) {
		if (l1 < l2 ) {
			/* the new interval is [b1,a2]  */
			a1=b1;
			b1=b2;
			l1=l2;
			/* compute the new internal point b2 and its log-likelihood  */
			b2=a1+(a2-a1)*v2;
			/* compute log-likelihood for b1 */
			for (i=0; i<nparm; i++) new_beta[i]=beta[i]+b2*dir[i];
			/* obtain new estimated probability */
			compute_prob(nobs, nvar, ivar1, new_beta, phat);
			/* obtain log-likelihood */
			l2=compute_loglik(phat, nobs);
		}
		else {
			/* the new interval is [a1,b2]  */
			a2=b2;
			b2=b1;
			l2=l1;
			/* compute the new internal point b2 and its log-likelihood  */
			b1=a1+(a2-a1)*v1;
			/* for b1 */
			b1=a1+(a2-a1)*v1;
			/* compute log-likelihood for b1 */
			for (i=0; i<nparm; i++) new_beta[i]=beta[i]+b1*dir[i];
			/* obtain new estimated probability */
			compute_prob(nobs, nvar, ivar1, new_beta, phat);
			/* obtain log-likelihood */
			l1=compute_loglik(phat, nobs);
		}
	}

	step=(a1+a2)/2.;

	/* compare with step=0 */
	for (i=0; i<nparm; i++) new_beta[i]=beta[i]+step*dir[i];
	/* obtain new estimated probability */
	compute_prob(nobs, nvar, ivar1, new_beta, phat);
	/* obtain log-likelihood */
	l1=compute_loglik(phat, nobs);

	if (l1<loglik) step=0;

	return;
}


/*
purpose : compute the log-likelihood function given estimated probability for each observation
input : 
	double *phat : estimated probability of size nobs
	long nobs : number of observations
return value 
	loglikelihood function value 
*/
// double compute_loglik(double *phat, long nobs)
function compute_loglik(phat, nobs)
{
	var i;
	var loglik;

	loglik=0.;
	
	for (i=0; i<nobs; i++) {
		if (DATA[i][1]>0.5) loglik += DATA[i][0]*mylog(phat[i]);
		else loglik += DATA[i][0]*mylog(1.-phat[i]);
	}

	return loglik;
}

/*
purpose : compute gradient
input : 
	double *phat : estimated probability of size nobs
	long nobs : number of observations
	long nvar : number of input variables
output :
	double *grad : one-dimensional array of size nvar+1 containing gradient
*/
// void compute_grad(double *phat, long nobs, long nvar, long *ivar1, double *grad)
function compute_grad(phat, nobs, nvar, ivar1, grad)
{
	var i, j; /* index variable */
	var t;

	/* initialization */
	for (j=0; j<=nvar; j++) grad[j]=0.;

	/* compute (Y-Phat)*X */
	for (i=0; i<nobs; i++) {
		t=DATA[i][1]-phat[i];
		grad[0] += DATA[i][0]*t;	/* for intercept */
		for (j=1; j<=nvar; j++) grad[j] += DATA[i][0]*t*DATA[i][ivar1[j-1]];
	}
	
	return;
}

/* 
purpose : compute denominator 
input : 
	double *phat : estimated probability of size nobs
	long nobs : number of observations
	long nvar : number of input variables
	long *ivar : array for locations of explanatory variables (size=nvar)
	double lambda : ridge value
output :
	double *den : one-dimensional array containing denominator
			(lower triangular part is saved row-wisely)
*/
// void compute_den(double *phat, long nobs, long nvar, long *ivar1, double lambda, double *den)
function compute_den(phat, nobs, nvar, ivar1, lambda, den)
{
	var i, j, k; /* index variable */
	var i1, ij; /* index for x */
	var Var;

	i1=indxs(nvar,nvar);
	for (j=0; j<=i1; j++) den[j]=0.;

	/* compute X'*var*X (var=diagonal matrix of p(1-p)) */
	for (k=0; k<nobs; k++) {
		Var=phat[k]*(1-phat[k]);
		/* for the first row or column; due to intercept */
		ij=0;
		den[ij++] += DATA[k][0]*Var;
		/* for the other element */
		for (i=0; i<nvar; i++) {
			den[ij++] += DATA[k][0]*Var*DATA[k][ivar1[i]];
			for (j=0; j<=i; j++) den[ij++] += DATA[k][0]*DATA[k][ivar1[i]]*DATA[k][ivar1[j]]*Var;
		}
	}

	// Marquadt
	if (Math.abs(lambda)>1e-10) for (i=0; i<=nvar; i++) den[indxs(i,i)] += lambda;

	return;
}

/*
purpose : compute probability in the logistic regression for reparameterized x
input : 
	long nobs : number of observations
	long nvar : number of input variables
	long *ivar : array for locations of explanatory variables (size=nvar)
	double *beta : parameter estimates of size (nvar+1)
output :
	double *phat : estimated probability
*/
// void compute_prob(long nobs, long nvar, long *ivar1, double *beta, double *phat)
function compute_prob(nobs, nvar, ivar1, beta, phat)
{
	var i, j; /* index variable */
	var ij; /* index for x */
	var eta;

	ij=0;
	for (i=0; i<nobs; i++) {
		eta=beta[0]; /* systematic component */
		for (j=1; j<=nvar; j++) {
			eta += beta[j]*DATA[i][ivar1[j-1]];
		}
		if (eta<0) phat[i]=1/(1+myexp(-eta)); /* inverse of link function */
		else phat[i]=(1-1/(1+myexp(eta)));
	}

	return;
}


/*
purpose : compute probability and classify obs using the logistic regression for unreparameterized x
input : 
	double **x : two dimensional array containing the explanatory variables (size=nobs*nx)
	long nobs : number of observations
	long nx : number of explanatory variables
	double *parm : parameter estimates of size=nparm
	long nparm : number of parameters
	int **info : two dimensional array containing variable information (size=ncol*2)
		The first col is for variable type (1: continuous, 2: ordinal, 3: nominal)
		The second col is for number of categories in each categorical variables. 
		For the continuous variables, 0 is saved.
output :
	double **pred : nobs*2 matrix containing predicted values
		pred[][0] : logit (x'*beta)
		pred[][1] : predicted probability
		pred[][2] : predicted class
*/

// void predict_cls(double **data, long nobs, long nx, double **parm, long nparm, long **info, double **pred) {
function predict_cls(data, nobs, nx, parm, nparm, info, pred) {

	var i, j;

	for (i=0; i<nobs; i++) {
		pred[i][0]=0.;
		for (j=0; j<nparm; j++) {
			if (parm[j][0]==0) pred[i][0]+=parm[j][2];
			else if (info[parseInt(parm[j][0])][0]==1) pred[i][0]+=data[i][parseInt(parm[j][0])+1]*parm[j][2];
			else if (parm[j][1]==data[i][parseInt(parm[j][0])+1]) pred[i][0]+=parm[j][2];
		}
		if (pred[i][0]<0) pred[i][1]=1/(1+myexp(-pred[i][0])); /* inverse of link function */
		else pred[i][1]=(1-1/(1+myexp(pred[i][0])));
		pred[i][2]=(pred[i][1]>0.5) ? 1 : 0; 
	}
}



/*******************************************************************/
/* purpose : solve XX*B=XY where XX is symmetric positive definite */
/*    and XY is a column vector                                    */
/* input :                                                         */
/*    double *xx : symmtric matrix whose lower triangular matrix   */
/*                 saved in rowwise                                */
/*    double *xy : column vector                                   */
/*    double *work : one dimensional array for temperary working   */
/*           space of size of ndim                                 */
/*    long ndim : row and column number of symmetric matrix xx      */
/*    double epsilon : small positive constant; a number smaller   */ 
/*           than this constant is considered as zero              */
/* output :                                                        */      
/*    double *b  : solution                                        */
/* return value :												   */
/*    0 : o.k.													   */
/*	  1 : xx is singluar; g-inverse is computed                    */
/* reference : Thisted                                             */
/*******************************************************************/
// long compute_beta(double *xx,double *xy,double *b,double *work,long ndim, double epsilon)
function compute_beta(xx, xy, b, work, ndim, epsilon)
{
   var i, j, k; /* index variable */
   
   /* obtain an inverse matrix using sweeping */
   k=gsweep(xx,ndim,work,epsilon);

   /* compute coefficient=inv(xx)*xy */
   for (i=0; i<ndim; i++) {
      b[i]=0;
	  for (j=0; j<ndim; j++) b[i] += xx[indxs(i,j)]*xy[j];
   }

   return(k);
}

/*******************************************************************/
/* purpose : compute generalized inverse for symmetric a           */
/*    nonnegative definite matrix using sweeping                   */
/* input :                                                         */
/*    double *xx : symmtric matrix whose lower triangular matrix   */
/*                 saved in rowwise                                */
/*    long ndim : row and column number of symmetric matrix xx      */
/*    double *work : one dimensional array for temperary working   */
/*           space of size of ndim                                 */
/*    double epsilon : small positive constant; a number smaller   */ 
/*           than this constant is considered as zero              */
/* output :                                                        */      
/*    double *xx : g-inverse matrix resulting from this module     */
/* return value :												   */
/*    0 : o.k.													   */
/*	  1 : matrix is singular; g-inverse is computed                */
/* reference : Thisted                                             */
/*******************************************************************/
// long gsweep(double *xx,long ndim,double *work,double epsilon) 
function gsweep(xx, ndim, work, epsilon) 
{
   var idim, i, j, k, isngl;
   var f;
   /* 
      idim, i, j, k : temporary index variable
      isngl : indicator variable for singularity 
              0 : nonsingular
              1 : singular
      f : temporary variable for right-end corner 
   */

   isngl=0;

   /* inverse of (1,1) element */
   if (xx[0]>epsilon) xx[0]=1/xx[0];
   else {
      xx[0]=0;
      isngl=1;
   }

   /* inverse of all element */ 
   for (idim=1; idim<ndim; idim++) {
      /* sweeping for idim-th row and column */
      /* work=xx[idim,0:(idim-1)]*xx[0:(idim-1),0:(idim-1)] */
      for (j=0; j<idim; j++) {
         work[j]=0;
         for (i=0; i<idim; i++) 
                 work[j]-=xx[indxs(idim,i)]*xx[indxs(i,j)];
      }
      /* f=xx[idim,idim]-xx[idim,0:(idim-1)]
               *xx[0:(idim-1),0:(idim-1)]*xx[0:(idim-1),idim]
          =xx[idim,idim]+work[0:(idim-1)]*xx[0:(idim-1),idim] */
      f=xx[indxs(idim,idim)];
      k=indxs(0,idim);
      for (i=0; i<idim; i++,k++) f += work[i]*xx[k];
      /* completion of sweeping */

      /* obtain inverse from sweeping */
      if (f<epsilon) {
         for (i=0; i<=idim; i++) xx[indxs(idim,i)]=0;
         isngl=1;
      }
      else {
         /* (idim,idim) element of inverse matrix */
         xx[indxs(idim,idim)]=1/f;
         /* (idim,0:(idim-1)) element of inverse matrix */
         /* xx[idim,0:(idim-1)]=-xx[idim,0:(idim-1)]
                   *xx[0:(idim-1),0:(idim-1)]/f
               =work/f */
         k=indxs(idim,0);
         for (j=0; j<idim; j++, k++) xx[k]=work[j]/f;
         /* xx[0:(idim-1),0:(idim-1)]=xx[0:(idim-1),0:(idim-1)]
                      +xx[idim,0:(idim-1)]*xx[0:(idim-1),0:(idim-1)]
                      *xx[0:(idim-1),0:(idim-1)]/f
               =xx[0:(idim-1),0:(idim-1)]-work'*work/f */
         for (i=0,k=0; i<idim; i++) {
            for(j=0; j<=i; j++, k++) xx[k] += work[i]*work[j]/f;
         }
      }
      /* completion of g-inverse for xx[0:idim,0:idim] */
   }
   /* completion of loop; g-inverse of xx */ 

   return(isngl);
}

/*******************************************************************/
/* index function for a symmetric matrix when lower triangular     */
/* part of the symmetric matrix is saved in one dimensionaly       */
/* array rowwisely.                                                */
/* input:                                                          */
/* 	i : integer row location                                       */
/* 	j : integer column location                                    */
/* output:                                                         */
/* 	location in one dimensionaly array                             */
/*******************************************************************/
// long indxs(long i, long j) 
function indxs(i, j) 
{
   if (i>j) return(i*(i+1)/2+j);   /* lower triangular part */
   else     return(j*(j+1)/2+i);   /* upper triangular part */
}


/* truncated log function */
// double mylog(double x)
function mylog(x)
{
	/* 1.e-250 should be changed by exp of minimum value of double precision */
	if(x < 1.e-250) return (double)(-576.);
	else return Math.log(x);
}

/* truncated exponentail function */
// double myexp(double x)
function myexp(x)
{
	/* 600 should be changed by log of maximum value of double precision */
	if(x<600) return(Math.exp(x));
	else return(Math.exp(600));
}




//****************************************************************************
//
//  Purpose:
// 
//    cdfchi2 evaluates the CDF of the chi-square distribution.
//
//  Reference:
//    ALGORITHM AS239  APPL. STATIST. (1988) VOL. 37, NO. 3
//
//  Parameters:
//
//    Input, double x, the upper limit of integration 
//    of the chi-square density.  It should lie in the
//    range [0, +infinity). 
//
//    Input, double df, the number of degrees of freedom. 
//    It should lie in the range: (0, +infinity).  
//
//    Output, int *ifault, reports the ifault of the computation.
//     0, if the calculation completed correctly;
//     1, if dfn or dfd is invalid;
//     2, if f is invalid;
//
//  Return value : integration of pdf of chi-square distribution from -infinity to f
//
//****************************************************************************
// double cdfchi2(double x, double df, long *ifault)
function cdfchi2(x, df, ifault)
{
	return(gammad(x/2., df/2., ifault));
}



//****************************************************************************
//
//  Purpose:
// 
//    gammad computes the incomplete gamma integral.
//
//  Reference:
//    ALGORITHM AS239  APPL. STATIST. (1988) VOL. 37, NO. 3
//
//  Parameters:
//
//    Input, double x, the upper limit of integration. 
//    It should lie in the range [0, +infinity). 
//
//    Input, double p, the parameter for gamma function. 
//    It should lie in the range: (0, +infinity).  
//
//    Output, int *ifault, reports the ifault of the computation.
//     0, if the calculation completed correctly;
//     1, if x or p is out of bound;
//
//  Return value : integration of pdf of chi-square distribution from -infinity to f
//
//****************************************************************************
// double gammad(double x, double p, long *ifault)
// double gammad(double x, double p, long *ifault)
function gammad(x, p, ifault)
{

	// ALGORITHM AS239  APPL. STATIST. (1988) VOL. 37, NO. 3

	// Computation of the Incomplete Gamma Integral
	//
	var pn1, pn2, pn3, pn4, pn5, pn6, arg, c, rn, a, b, an, gammad;
	var 
		oflo = 1.e37, tol = 1.e-14, xbig = 1.e+8, plimit = 1000.e0, elimit = -88.e0;
	var icont;

	gammad =0.;

	// Check that we have valid values for x and p

	if (p <= 0. || x < 0.) {
		ifault = 1;
		return(0.);
	}
	ifault = 0;
	if (x==0.) return(0.);

	// Use a normal approximation if p > plimit

	if (p > plimit) {
		pn1 = 3. * Math.sqrt(p) * (Math.pow((x / p),(1. / 3.)) + 1. / (9. * p) - 1.);
		gammad = alnorm(pn1);
		return(gammad);
	}

	// If x is extremely large compared to P then set gammad = 1

	if (x > xbig) return(1.);

	if (x <1 || x<p) {

		// Use Pearson's series expansion.
		// (Note that p is not large enough to force overflow in ALOGAM).
		// No need to test IFAULT on exit since P > 0.

		arg = p * Math.log(x) - x - alogam(p + 1., ifault);
		c = 1.;
		gammad = 1.;
		a = p;
		icont=1;
		while(icont) {
			a++;
			c = c * x / a;
			gammad += c;
			if (c <= tol) icont=0;
		}
		arg += Math.log(gammad);
		if (arg >= elimit) gammad = Math.exp(arg);
		else gammad=0.;
	}
	else {

		// Use a continued fraction expansion

		arg = p * Math.log(x) - x - alogam(p, ifault);
		a = 1. - p;
		b = a + x + 1.;
		c = 0.;
		pn1 = 1.;
		pn2 = x;
		pn3 = x + 1.;
		pn4 = x * b;
		gammad = pn3 / pn4;

		while(1) {
			a = a + 1.;
			b = b + 2.;
			c = c + 1.;
			an = a * c;
			pn5 = b * pn3 - an * pn1;
			pn6 = b * pn4 - an * pn2;
			if (Math.abs(pn6) > 0.) {
				rn = pn5 / pn6;
				if (Math.abs(gammad - rn) <= tol || Math.abs(gammad - rn) <= tol*rn) break;
				gammad = rn;
			}
			pn1 = pn3;
			pn2 = pn4;
			pn3 = pn5;
			pn4 = pn6;
			if (Math.abs(pn5) >= oflo) {
				// re-scale terms in continued fraction if terms are large
				pn1 = pn1 / oflo;
				pn2 = pn2 / oflo;
				pn3 = pn3 / oflo;
				pn4 = pn4 / oflo;
			}
		}

		arg = arg + Math.log(gammad);
		if (arg >= elimit) gammad = 1. - Math.exp(arg);
		else gammad=1.;
	}

	return(gammad);
}



//****************************************************************************
//
//  Purpose:
// 
//    alogam computes log of gamma function.
//
//  Reference:
//    ALGORITHM AS245  APPL. STATIST. (1989) VOL. 38, NO. 2
//
//  Parameters:
//
//    Input, double xvalue, the parameter for gamma function. 
//    It should lie in the range: (0, +infinity).  
//
//    Output, long *ifault, reports the ifault of the computation.
//     0, if the calculation completed correctly;
//     1, if xvalue is out of bound;
//
//  Return value : gamma function value
//
//****************************************************************************
// double alogam(double xvalue, long *ifault)
function alogam(xvalue, ifault)
{

	var alogam, x, x1, x2, xlge, xlgst, y;

	// Coefficients of rational functions
	var 
		r1=[
			-2.66685511495e0, -2.44387534237e1, -2.19698958928e1, 1.11667541262e1,
			 3.13060547623e0,  6.07771387771e-1, 1.19400905721e1, 3.14690115749e1,
			 1.52346874070e1
		];
	var	r2=[
			-7.83359299449e1, -1.42046296688e2,  1.37519416416e2,  7.86994924154e1,
			 4.16438922228e0,  4.70668766060e1,  3.13399215894e2,  2.63505074721e2,
			 4.33400022514e1
		];
	var	r3=[
			-2.12159572323e5,  2.30661510616e5,  2.74647644705e4, -4.02621119975e4,
			-2.29660729780e3, -1.16328495004e5, -1.46025937511e5, -2.42357409629e4,
			-5.70691009324e2
		];
	var	r4=[
			 2.79195317918525e-1,  4.917317610505968e-1,  6.92910599291889e-2, 
			 3.350343815022304e0,  6.012459259764103e0
		];

	// Fixed constants
	var alr2pi=9.18938533204673e-1;

	// Machine-dependant constants.
	// A table of values is given at the top of page 399 of the paper.
	// These values are for the IEEE double-precision format for which
	// B = 2, t = 53 and U = 1023 in the notation of the paper.
	xlge=5.10e6;
	xlgst=1.e+305;

	x = xvalue;
	alogam = 0.;

	// Test for valid function argument

	if (x >= xlgst || x <= 0.) {
		ifault = 1;
		return(alogam);
	}

	ifault = 0;
	
	if (x < 1.5) {
		// Calculation for 0 < X < 0.5 and 0.5 <= X < 1.5 combined
		if (x < 0.5) {
			alogam = -Math.log(x);
			y = x + 1.;
			// test whether x < machine epsilon
			if (y == 1.) return(alogam);
		}
		else {
		  alogam = 0.;
		  y = x;
		  x = x - 1.;
		}
		alogam = alogam + x * ((((r1[4]*y + r1[3])*y + r1[2])*y
						+ r1[1])*y + r1[0]) / ((((y + r1[8])*y + r1[7])*y
						+ r1[6])*y + r1[5]);
	}
	else if (x < 4.) {
		// Calculation for 1.5 <= X < 4.0
		y = x - 2.;
		alogam = y * ((((r2[4]*x + r2[3])*x + r2[2])*x + r2[1])*x
						+ r2[0]) / ((((x + r2[8])*x + r2[7])*x + r2[6])*x + r2[5]);
	}
	else if (x < 12.) {
		// Calculation for 4.0 <= X < 12.0
		alogam = ((((r3[4]*x + r3[3])*x + r3[2])*x + r3[1])*x + r3[0]) /
                 ((((x + r3[8])*x + r3[7])*x + r3[6])*x + r3[5]);
	}
	else {
		// Calculation for X >= 12.0
		y = Math.log(x);
		alogam = x * (y - 1.) - 0.5 * y + alr2pi;
		if (x <= xlge) {
			x1 = 1. / x;
			x2 = x1 * x1;
			alogam = alogam + x1 * ((r4[2]*x2 + r4[1])*x2 + r4[0])
								/ ((x2 + r4[4])*x2 + r4[3]);
		}
	}

	return(alogam);
}





//****************************************************************************
//
//  Purpose:
// 
//    alnorm evaluates the CDF of the standard normal distribution.
//
//  Reference:
//
//    A G Adams,
//    Areas Under the Normal Curve,
//    Algorithm 39, 
//    Computer j., 
//    Volume 12, pages 197-198, 1969.
//
//  Parameters:
//
//    Input, double x, the upper limit of integration 
//    of the standard normal density.  It should lie in the
//    range [0, +infinity). 
//
//  Return value : integration of pdf of the standard normal distribution 
//    from -infinity to f
//
//****************************************************************************
// double alnorm( double x )
function alnorm( x )
{
	var cdf, q, y;
	var 
		a1 = 0.398942280444,
		a2 = 0.399903438504,
		a3 = 5.75885480458,
		a4 = 29.8213557808,
		a5 = 2.62433121679,
		a6 = 48.6959930692,
		a7 = 5.92885724438,
		b0 = 0.398942280385,
		b1 = 3.8052E-08,
		b2 = 1.00000615302,
		b3 = 3.98064794E-04,
		b4 = 1.98615381364,
		b5 = 0.151679116635,
		b6 = 5.29330324926,
		b7 = 4.8385912808,
		b8 = 15.1508972451,
		b9 = 0.742380924027,
		b10 = 30.789933034,
		b11 = 3.99019417011;

	if ( Math.abs ( x ) <= 1.28 ) {
		// |X| <= 1.28.
		y = 0.5 * x * x;
		q = 0.5 - Math.abs ( x ) * ( a1 - a2 * y / ( y + a3 - a4 / ( y + a5 
			+ a6 / ( y + a7 ) ) ) );
	}
	else if ( Math.abs ( x ) <= 12.7 ) {
		// 1.28 < |X| <= 12.7
		y = 0.5 * x * x;
		q = exp ( - y ) * b0 / ( Math.abs ( x ) - b1 
			+ b2 / ( Math.abs ( x ) + b3 
			+ b4 / ( Math.abs ( x ) - b5 
			+ b6 / ( Math.abs ( x ) + b7 
			- b8 / ( Math.abs ( x ) + b9 
			+ b10 / ( Math.abs ( x ) + b11 ) ) ) ) ) );
	}
	// 12.7 < |X|
	else q = 0.0;

	// Take account of negative X
	if ( x < 0.0 ) cdf = q;
	else cdf = 1.0 - q;

	return(cdf);
}




