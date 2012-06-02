<?php

$terms = array();

$taxes = array('projects', 'post_tag', 'code');
foreach ($taxes as $tax) {
	if (($tax_terms = get_the_terms($post->ID, $tax)) != false) {
		$terms = array_merge($terms, $tax_terms);
	}
}

if (count($terms)) {
	$tags = get_the_term_list($post->ID, 'projects', '<span class="tag-group">', ', ', '</span>')
		.get_the_term_list($post->ID, 'post_tag', '<span class="tag-group">', ', ', '</span>')
		.get_the_term_list($post->ID, 'code', '<span class="tag-group">', ', ', '</span>');
}
else {
	$tags = '<span class="none">'.__('(no tags)', 'capsule').'</span>';
}

?>
<article id="post-excerpt-<?php echo $post->ID; ?>" data-post-id="<?php echo $post->ID; ?>" <?php post_class('excerpt clearfix', $post->ID); ?>>
	<header>
		<a href="<?php get_permalink($post->ID); ?>" class="post-link"><?php echo get_the_time('', $post); ?></a>
<?php
echo $tags;
?>
		<a href="<?php echo esc_url(admin_url('post.php?post='.$post->ID.'&action=edit')); ?>" class="post-edit-link"><i class="icon-pencil"></i></a>
	</header>
	<div class="content"><?php the_excerpt(); ?></div>
	<a href="<?php echo esc_url(admin_url('post.php?post='.$post->ID.'&action=trash')); ?>" class="post-delete-link"><i class="icon-trash"></i></a>
</article>
